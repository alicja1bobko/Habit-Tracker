import React, { MouseEvent, ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import Statistics from "../components/loggedIn/Statistics/Statistics";
import Greeting from "../components/loggedIn/Greeting";
import ProfilePicture from "../components/loggedIn/ProfilePicture";
import DashboardLayout from "../Layouts/DashboardLayout";
import { DailyGoals } from "../components/loggedIn/DailyGoals";
import { useUser } from "../context/user-context";
import { IUserData } from "../context/user-context";
import { addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "./api/firebase";
import useAuth from "../context/auth-context";
import { normaliZeWeekdayFromDate } from "../utils/weekdays";
import ProgressCalendar from "../components/loggedIn/ProgressCalendar";
import { HabitsList } from "../components/loggedIn/HabitsList";
import WeekdaysHeader from "../components/loggedIn/WeekdaysHeader";
import { SelectChangeEvent } from "@mui/material";
import { lightFormat } from "date-fns";
import { CalendarDateRange } from "../components/loggedIn/CalendarDateRange";
import { weeksList } from "../utils/weeksRangeList";
import { monthsList } from "../utils/monthRangeList";
import { daysList } from "../utils/daysRangeList";
import DailyGoalsSelectDateHeader from "../components/loggedIn/DailyGoalsSelectDateHeader";
import { countCurrentGoals } from "../components/loggedIn/Statistics/countCurrentGoals";
import { countAchievedToday } from "../components/loggedIn/Statistics/countAchievedToday";
import { countBestStreak } from "../components/loggedIn/Statistics/countBestStreak";

const habitDashboardPage: NextPageWithLayout = () => {
  const userData: IUserData | null = useUser();
  const { user } = useAuth();

  const NUMBER_OF_PAST_WEEKS = 4;
  const NUMBER_OF_PAST_MONTHS = 6;
  const NUMBER_OF_PAST_DAYS = 7;
  //Object to store selected week range, month, days and pass it to Components
  const selectDayRange = daysList(NUMBER_OF_PAST_DAYS);
  const selectWeekRange = weeksList(NUMBER_OF_PAST_WEEKS);
  const selectMonthsRange = monthsList(NUMBER_OF_PAST_MONTHS);

  const [habits, setHabits] = useState<IUserData["habits"]>({});
  const [checkmarks, setCheckmarks] = useState<IUserData["checkmarks"]>({});
  const [loading, setLoading] = useState(false);
  const [selectedRangeIndex, setSelectedRangeIndex] = useState("0");
  const [selectedDayIndex, setSelectedDayIndex] = useState("0");
  const [weekView, setWeekView] = useState(true);
  const [selectedHabit, setSelectedHabit] = useState(0);
  const [selectedHabitKey, setSelectedHabitKey] = useState("");

  const habitsKeys = Object.keys(userData.habits);
  const habitNames = habitsKeys.map((key) => userData.habits[key].name);

  useEffect(() => {
    setLoading(true);
    initializeNewDay(userData.checkmarks, userData.habits);
  }, [userData, selectedDayIndex]);

  //check if selected day's checkmarks exist in database if not initialize
  const initializeNewDay = async (
    allCheckmarks: { [key: string]: any },
    allHabits: { [key: string]: any }
  ) => {
    setLoading(true);
    const selectedDay: any = lightFormat(
      selectDayRange[selectedDayIndex],
      "d-M-yyy"
    );
    const weekday = normaliZeWeekdayFromDate(selectDayRange[selectedDayIndex]);
    const checkmarkKeys = Object.keys(allCheckmarks);

    let selectedDaysCheckmarkKeys = checkmarkKeys.filter(
      (checkmarkKey) => allCheckmarks[checkmarkKey].date == selectedDay
    );

    let selectedDaysHabitKeys = habitsKeys.filter((habitKey) => {
      if (allHabits[habitKey].frequency.some((day: any) => day == weekday)) {
        return habitKey;
      }
    });

    // if habits for today exist setHabits
    if (selectedDaysHabitKeys.length !== 0) {
      let todaysHabits = selectedDaysHabitKeys.map((habitKey) => {
        return { [habitKey!]: allHabits[habitKey!] };
      });

      // transform array of objects to key value object
      const res = todaysHabits.reduce((acc, curr) => {
        return { ...acc, ...curr };
      }, {});
      setHabits(res);
    }

    // check if habits for today exist in db, set checkmarks for each habit in db

    if (
      selectedDaysCheckmarkKeys.length == 0 &&
      selectedDaysHabitKeys.length !== 0
    ) {
      const checkmarksDoc = collection(db, `users/${user?.uid}/checkmarks`);
      setLoading(true);

      // add new checkmarks docs for all today's habits

      const addCheckmarksToDb = async () => {
        const promises = selectedDaysHabitKeys.map(async (habitKey) => {
          const docRef = await addDoc(checkmarksDoc, {
            completed: false,
            habitId: habitKey,
            date: selectedDay,
          });
          const docSnap = await getDoc(docRef);
          return { [docRef.id]: docSnap.data() };
        });

        return await Promise.all(promises);
      };

      await addCheckmarksToDb().then((habitsArray) => {
        let checkmarksObj: any = habitsArray.reduce(
          (acc, cur) => ({ ...acc, ...cur }),
          {}
        );
        setCheckmarks(checkmarksObj);
        setLoading(false);
      });
    } else {
      setLoading(true);
      let todaysCheckmarks = selectedDaysCheckmarkKeys.map((checkmarkKey) => {
        return { [checkmarkKey]: allCheckmarks[checkmarkKey] };
      });
      // transform array of objects to key value object
      const res = todaysCheckmarks.reduce((acc, curr) => {
        return { ...acc, ...curr };
      }, {});
      setCheckmarks(res);
      setLoading(false);
    }
  };

  const handleSelectDateRange = (event: SelectChangeEvent<string>) => {
    let index = event.target.value;
    if (weekView) {
      setSelectedRangeIndex(index);
    } else {
      setSelectedRangeIndex(index);
    }
  };

  const handleSelectedCalendarView = (
    event: MouseEvent<HTMLButtonElement>,
    value: boolean
  ): void => {
    setSelectedRangeIndex("0");
    let habitKey = habitsKeys.find(
      (key) => userData.habits[key].name === habitNames[0]
    ) as string;
    setSelectedHabit(0);
    setSelectedHabitKey(habitKey);
    setWeekView(value);
  };

  const handleSelectedHabit = (index: number): void => {
    setSelectedHabit(index);
    let habitKey = habitsKeys.find(
      (key) => userData.habits[key].name === habitNames[index]
    ) as string;
    setSelectedHabitKey(habitKey);
  };

  const handleSelectDay = (event: SelectChangeEvent<string>): void => {
    setSelectedDayIndex(event.target.value);
  };

  return (
    <>
      <div className="col-span-4 xl:col-span-1 p-3 md:p-5">
        <div className="statistics-layout">
          <Greeting />
          <ProfilePicture />
          <Statistics
            header={"Current goal"}
            text={"habit"}
            stat={countCurrentGoals(userData["habits"])}
          />
          <Statistics
            header={"Achieved today"}
            text={"habit"}
            stat={countAchievedToday(userData["checkmarks"])}
          />
          <Statistics
            header={"Best streak"}
            text={"day"}
            stat={
              countBestStreak(userData["checkmarks"], userData["habits"])[1]
            }
            habit={
              countBestStreak(userData["checkmarks"], userData["habits"])[0]
            }
          />
        </div>
        <div className="mt-10 xl:mt-12 mb-5">
          <CalendarDateRange
            selectedRange={selectedRangeIndex}
            handleSelect={handleSelectDateRange}
            selectDatesRange={weekView ? selectWeekRange : selectMonthsRange}
            handleSelectedCalendarView={handleSelectedCalendarView}
            weekView={weekView}
          />
          <WeekdaysHeader />
          <div
            className={`progress-calendar-grid grid-rows-${habitNames.length} `}
          >
            <HabitsList
              habitNames={habitNames}
              weekView={weekView}
              selectedHabit={selectedHabit}
              handleSelectedHabit={handleSelectedHabit}
            />
            <ProgressCalendar
              checkmarks={userData.checkmarks}
              habits={userData.habits}
              weekView={weekView}
              selectedHabitKey={selectedHabitKey}
              selectDatesRange={
                weekView
                  ? selectWeekRange[selectedRangeIndex]
                  : selectMonthsRange[selectedRangeIndex]
              }
            />
          </div>
        </div>
        <hr></hr>
      </div>
      <div className="col-span-4 md:col-span-1 mt-5 md:m-0 p-2 md:p-0">
        <DailyGoalsSelectDateHeader
          selectedDayIndex={selectedDayIndex}
          handleSelectDay={handleSelectDay}
          selectDayRange={selectDayRange}
        />
        <DailyGoals habits={habits} checkmarks={checkmarks} loading={loading} />
      </div>
    </>
  );
};

habitDashboardPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout
      meta={{
        title: "Habit tracker | Dashboard",
        description: "Habit tracker DashboardPage",
      }}
    >
      <div className="w-full bg-white p-2 md:p-10 rounded-3xl md:-translate-y-12 md:grid md:grid-cols-1 xl:grid-cols-[auto_275px] xl:gap-12 ">
        {page}
      </div>
    </DashboardLayout>
  );
};

export default habitDashboardPage;

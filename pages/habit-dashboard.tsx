import React, { MouseEvent, ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import Statistics from "../components/loggedIn/Statistics";
import Greeting from "../components/loggedIn/Greeting";
import ProfilePicture from "../components/loggedIn/ProfilePicture";
import DashboardLayout from "../Layouts/DashboardLayout";
import { DailyGoals } from "../components/loggedIn/DailyGoals";
import { useUser } from "../context/user-context";
import { IUserData } from "../context/user-context";
import { addDoc, collection } from "firebase/firestore";
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
import { MonthsList } from "../utils/monthRangeList";

const habitDashboardPage: NextPageWithLayout = () => {
  const userData: IUserData | null = useUser();
  const { user } = useAuth();

  const [habits, setHabits] = useState<IUserData["habits"]>({});
  const [checkmarks, setCheckmarks] = useState<IUserData["checkmarks"]>({});
  const [loading, setLoading] = useState(false);
  const [selectedRangeIndex, setSelectedRangeIndex] = useState("0");
  const [weekView, setWeekView] = useState(true);
  const [selectedHabit, setSelectedHabit] = useState(0);
  const [selectedHabitKey, setSelectedHabitKey] = useState("");
  const NUMBER_OF_PAST_WEEKS = 4;
  const NUMBER_OF_PAST_MONTHS = 6;

  const habitsKeys = Object.keys(userData.habits);
  const habitNames = habitsKeys.map((key) => userData.habits[key].name);

  useEffect(() => {
    setLoading(true);
    initializeNewDay(userData.checkmarks, userData.habits);
  }, [userData]);

  //check if today's checkmarks exist in database if not initialize
  const initializeNewDay = (
    allCheckmarks: { [key: string]: any },
    allHabits: { [key: string]: any }
  ) => {
    setLoading(true);
    const today: any = lightFormat(new Date(), "d-M-yyy");
    const weekday = normaliZeWeekdayFromDate();
    const checkmarkKeys = Object.keys(allCheckmarks);

    let todaysCheckmarkKeys = checkmarkKeys.filter(
      (checkmarkKey) => allCheckmarks[checkmarkKey].date == today
    );

    let todaysHabitKeys = habitsKeys.filter((habitKey) => {
      if (allHabits[habitKey].frequency.some((day: any) => day == weekday)) {
        return habitKey;
      }
    });

    // if habits for today exist setHabits
    if (todaysHabitKeys.length !== 0) {
      let todaysHabits = todaysHabitKeys.map((habitKey) => {
        return { [habitKey!]: allHabits[habitKey!] };
      });

      // transform array of objects to key value object
      const res = todaysHabits.reduce((acc, curr) => {
        return { ...acc, ...curr };
      }, {});
      setHabits(res);
    }

    //if habits for today exist set checkmarks for each habit in db
    if (todaysCheckmarkKeys.length == 0 && todaysHabitKeys.length !== 0) {
      const checkmarksDoc = collection(db, `users/${user?.uid}/checkmarks`);
      setLoading(true);
      //add new checkmarks docs for all today's habits
      const addCheckmarksToDb = () => {
        todaysHabitKeys.forEach(async (habitKey) => {
          const docRef = await addDoc(checkmarksDoc, {
            completed: false,
            habitId: habitKey,
            date: today,
          });
          setCheckmarks({ [docRef.id]: userData.checkmarks[docRef.id] });
          setLoading(false);
        });
      };
      addCheckmarksToDb();
    } else {
      setLoading(true);
      let todaysCheckmarks = todaysCheckmarkKeys.map((checkmarkKey) => {
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

  //Object to store selected week range and pass it to Progress Calendar
  const selectWeekRange = () => weeksList(NUMBER_OF_PAST_WEEKS);
  const selectMonthsRange = () => MonthsList(NUMBER_OF_PAST_MONTHS);

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
  return (
    <>
      <div className="col-span-4 xl:col-span-1 p-3 md:p-5">
        <div className="statistics-layout">
          <Greeting />
          <ProfilePicture />
          <Statistics header={"Current goal"} text={"habits"} stat={6} />
          <Statistics header={"Achieved today"} text={"habits"} stat={6} />
          <Statistics
            header={"Best streak"}
            text={"days of"}
            stat={7}
            habit={"meditation"}
          />
        </div>
        <div className="mt-10 xl:mt-12 mb-5">
          <CalendarDateRange
            selectedRange={selectedRangeIndex}
            handleSelect={handleSelectDateRange}
            selectDatesRange={
              weekView ? selectWeekRange() : selectMonthsRange()
            }
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
                  ? selectWeekRange()[selectedRangeIndex]
                  : selectMonthsRange()[selectedRangeIndex]
              }
            />
          </div>
        </div>
        <hr></hr>
      </div>
      <div className="col-span-4 md:col-span-1 mt-5 md:m-0 p-2 md:p-0">
        <div className="flex justify-between">
          <h3 className="font-bold text-2xl mb-3 mt-2">Habits</h3>
        </div>
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

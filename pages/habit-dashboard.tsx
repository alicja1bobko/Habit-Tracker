import React, { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import Statistics from "../components/loggedIn/Statistics";
import Greeting from "../components/loggedIn/Greeting";
import ProfilePicture from "../components/loggedIn/ProfilePicture";
import DashboardLayout from "../Layouts/DashboardLayout";
import DailyGoals from "../components/loggedIn/DailyGoals";
import { useUser } from "../context/user-context";
import { IUserData } from "../context/user-context";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./api/firebase";
import useAuth from "../context/auth-context";
import { normaliZeWeekdayFromDate } from "../utils/weekdays";
import ProgressCalendar from "../components/loggedIn/ProgressCalendar";
import { SelectChangeEvent } from "@mui/material";
import {
  endOfWeek,
  lightFormat,
  Locale,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { CalendarDateRange } from "../components/loggedIn/CalendarDateRange";

const habitDashboardPage: NextPageWithLayout = () => {
  const userData: IUserData | null = useUser();
  const { user } = useAuth();
  const [habits, setHabits] = useState<IUserData["habits"]>({});
  const [checkmarks, setCheckmarks] = useState<IUserData["checkmarks"]>({});
  const [loading, setLoading] = useState(false);
  const [weekStart, setWeekStart] = useState(
    startOfWeek(new Date(), { locale: { code: "en-gb" }, weekStartsOn: 1 })
  );
  const [weekEnd, setWeekEnd] = useState(
    endOfWeek(new Date(), { locale: { code: "en-gb" }, weekStartsOn: 1 })
  );
  const [selectedWeek, setSelectedWeek] = useState("0");

  const locale: Locale = { code: "en-gb" };
  const NUMBER_OF_PAST_WEEKS = 4;

  useEffect(() => {
    setLoading(true);
    initializeNewDay(userData.checkmarks, userData.habits);
  }, [userData]);

  //check if today's checkmarks exist in database if not initialize
  const initializeNewDay = (
    allCheckmarks: { [key: string]: any },
    allHabits: { [key: string]: any }
  ) => {
    const today: any = lightFormat(new Date(), "d-M-yyy");
    const weekday = normaliZeWeekdayFromDate();
    const checkmarkKeys = Object.keys(allCheckmarks);
    const habitsKeys = Object.keys(allHabits);

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
        });
      };
      addCheckmarksToDb();
      setLoading(false);
    } else {
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
  const weeksList = (num: Number) => {
    let weekStarts = startOfWeek(new Date(), {
      locale: { code: "en-gb" },
      weekStartsOn: 1,
    });
    let weekEnds = endOfWeek(new Date(), {
      locale: { code: "en-gb" },
      weekStartsOn: 1,
    });
    let selectWeeks: {
      [key: string]: {
        start: Date;
        end: Date;
      };
    } = {
      ["0"]: { start: weekStarts, end: weekEnds },
    };
    for (let i = 1; i <= num; i++) {
      let start = subWeeks(weekStarts, i);
      let end = endOfWeek(start, { locale, weekStartsOn: 1 });
      selectWeeks = {
        ...selectWeeks,
        [i.toString()]: { start: start, end: end },
      };
    }
    return selectWeeks;
  };
  const selectWeekRange = weeksList(NUMBER_OF_PAST_WEEKS);

  const handleSelect = (event: SelectChangeEvent<string>) => {
    let index = event.target.value;
    setSelectedWeek(index);
    setWeekStart(selectWeekRange[index]["start"]);
    setWeekEnd(selectWeekRange[index]["end"]);
  };

  return (
    <>
      <div className="col-span-4 xl:col-span-1 p-5">
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
            selectedWeek={selectedWeek}
            handleSelect={handleSelect}
            selectWeekRange={selectWeekRange}
          />
          <ProgressCalendar
            checkmarks={userData.checkmarks}
            habits={userData.habits}
            weekStart={weekStart}
            weekEnd={weekEnd}
          />
        </div>
        <hr></hr>
      </div>
      <div className="col-span-4 md:col-span-1 mt-5 md:m-0">
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
      <div className="w-full bg-white p-10 rounded-3xl md:-translate-y-12 md:grid md:grid-cols-1 xl:grid-cols-[auto_275px] xl:gap-12 ">
        {page}
      </div>
    </DashboardLayout>
  );
};

export default habitDashboardPage;

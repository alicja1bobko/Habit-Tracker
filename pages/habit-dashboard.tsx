import React, { ReactElement, useEffect, useState } from "react";
import Statistics from "../components/loggedIn/Statistics";
import Greeting from "../components/loggedIn/Greeting";
import ProfilePicture from "../components/loggedIn/ProfilePicture";
import DashboardLayout from "../Layouts/DashboardLayout";
import { NextPageWithLayout } from "./_app";
import DailyGoals from "../components/loggedIn/DailyGoals";
import { useUser } from "../context/user-context";
import { IUserData } from "../context/user-context";
import { getToday } from "../utils/getToday";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./api/firebase";
import useAuth from "../context/auth-context";
import { normaliZeWeekdayFromDate } from "../utils/weekdays";

const habitDashboardPage: NextPageWithLayout = () => {
  const userData: IUserData | null = useUser();
  const { user } = useAuth();
  const [habits, setHabits] = useState<IUserData["habits"]>({});
  const [checkmarks, setCheckmarks] = useState<IUserData["checkmarks"]>({});

  const today: any = getToday();
  const weekday = normaliZeWeekdayFromDate();

  useEffect(() => {
    initializeNewDay(userData.checkmarks, userData.habits);
  }, [userData]);

  //check if today's checkmarks exist in database if not initialize
  const initializeNewDay = (
    allCheckmarks: { [key: string]: any },
    allHabits: { [key: string]: any }
  ) => {
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
    } else {
      let todaysCheckmarks = todaysCheckmarkKeys.map((checkmarkKey) => {
        return { [checkmarkKey]: allCheckmarks[checkmarkKey] };
      });
      // transform array of objects to key value object
      const res = todaysCheckmarks.reduce((acc, curr) => {
        return { ...acc, ...curr };
      }, {});
      setCheckmarks(res);
    }
  };

  return (
    <>
      <div className="col-span-4">
        <Greeting />
        <div className="flex flex-col xl:flex-row justify-between">
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
        {/* <ProgressCalendar /> */}
      </div>
      <div className="col-span-1">
        <div className="flex justify-between">
          <h3 className="font-bold text-lg mb-2 mt-2">Habits</h3>
        </div>
        <DailyGoals habits={habits} checkmarks={checkmarks} />
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
      <div className="w-full bg-white p-10 rounded-3xl md:-translate-y-12 grid grid-cols-1 xl:grid-cols-5 xl:gap-5 ">
        {page}
      </div>
    </DashboardLayout>
  );
};

export default habitDashboardPage;

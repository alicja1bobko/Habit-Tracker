import Image from "next/image";
import React, { ReactElement } from "react";
import Statistics from "../components/loggedIn/Statistics";
import Greeting from "../components/loggedIn/Greeting";
import ProfilePicture from "../components/loggedIn/ProfilePicture";
import DashboardLayout from "../Layouts/DashboardLayout";
import { NextPageWithLayout } from "./_app";
import DailyGoals from "../components/loggedIn/DailyGoals";
import ProgressCalendar from "../components/loggedIn/Calendar";

const habitDashboardPAge: NextPageWithLayout = () => {
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
        <DailyGoals />
      </div>
    </>
  );
};

habitDashboardPAge.getLayout = function getLayout(page: ReactElement) {
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

export default habitDashboardPAge;

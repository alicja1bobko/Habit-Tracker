import Image from "next/image";
import React, { ReactElement } from "react";
import Greeting from "../components/loggedIn/Greeting";
import ProfilePicture from "../components/loggedIn/ProfilePicture";
import DashboardLayout from "../Layouts/DashboardLayout";
import { NextPageWithLayout } from "./_app";

const habitDashboardPAge: NextPageWithLayout = () => {
  return (
    <>
      <Greeting />
      <ProfilePicture />
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
      <div className="w-full bg-white p-10 rounded-3xl md:-translate-y-12 ">
        {page}
      </div>
    </DashboardLayout>
  );
};

export default habitDashboardPAge;

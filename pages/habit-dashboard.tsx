import React, { ReactElement } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import { NextPageWithLayout } from "./_app";

const habitDashboardPAge: NextPageWithLayout = () => {
  return <div>Dashboard</div>;
};

habitDashboardPAge.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout
      meta={{
        title: "Habit tracker | Dashboard",
        description: "Habit tracker DashboardPage",
      }}
    >
      {page}
    </DashboardLayout>
  );
};

export default habitDashboardPAge;

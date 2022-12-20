import React, { ReactElement } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import { NextPageWithLayout } from "./_app";

const settingsPage: NextPageWithLayout = () => {
  return <div>Settings</div>;
};

settingsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout
      meta={{
        title: "Habit tracker | Settings",
        description: "Habit tracker Settings",
      }}
    >
      {page}
    </DashboardLayout>
  );
};

export default settingsPage;

import React, { ReactElement } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import { NextPageWithLayout } from "./_app";

const manageHabitsPage: NextPageWithLayout = () => {
  return <div>Manage habits</div>;
};

manageHabitsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout
      meta={{
        title: "Habit tracker | Manage habits",
        description: "Habit tracker Manage Habits Subpage",
      }}
    >
      {page}
    </DashboardLayout>
  );
};

export default manageHabitsPage;

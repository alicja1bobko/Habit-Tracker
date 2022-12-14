import React, { ReactElement } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import { NextPageWithLayout } from "./_app";

const addHabitPage: NextPageWithLayout = () => {
  return <div>Add habit</div>;
};

addHabitPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout
      meta={{
        title: "Habit tracker | Add habit",
        description: "Habit tracker Add Habit Subpage",
      }}
    >
      {page}
    </DashboardLayout>
  );
};

export default addHabitPage;

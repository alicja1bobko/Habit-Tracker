import { ReactElement } from "react";
import { Habit } from "../components/loggedIn/Habit";
import { IUserData, useUser } from "../context/user-context";
import DashboardLayout from "../Layouts/DashboardLayout";
import { NextPageWithLayout } from "./_app";

const manageHabitsPage: NextPageWithLayout = () => {
  const userData: IUserData | null = useUser();
  const habitKeys = Object.keys(userData.habits);

  return (
    <div className="flex flex-col p-5 md:p-10">
      {habitKeys.length !== 0 && (
        <h1 className="text-4xl font-bolder mb-3">Manage habits</h1>
      )}
      <div className="mt-5">
        {habitKeys.map((habitKey, index) => {
          return (
            <Habit
              key={index}
              habitKey={habitKey}
              habit={userData.habits[habitKey]}
            />
          );
        })}
      </div>
    </div>
  );
  };

manageHabitsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout
      meta={{
        title: "Habit tracker | Manage habits",
        description: "Habit tracker Manage Habits Subpage",
      }}
    >
      <div className="items-center justify-center align-middle min-h-[calc(100vh-4rem)] flex bg-white p-3 md:pl-10 md:pr-10 rounded-3xl md:-translate-y-12 ">
        {page}
      </div>
    </DashboardLayout>
  );
};

export default manageHabitsPage;

import { Delete, Edit } from "@material-ui/icons";
import { IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import React, { ReactElement } from "react";
import useAuth from "../context/auth-context";
import { IUserData, useUser } from "../context/user-context";
import DashboardLayout from "../Layouts/DashboardLayout";
import { weekdaysTable } from "../utils/weekdays";
import { NextPageWithLayout } from "./_app";

const manageHabitsPage: NextPageWithLayout = () => {
  const userData: IUserData | null = useUser();
  const { user } = useAuth();
  const habitKeys = Object.keys(userData.habits);

  return (
    <div className="flex flex-col p-10">
      <h1 className="text-4xl font-bolder mb-3">Manage habits</h1>
      <div className="mt-5">
        {habitKeys.map((habitKey, index) => {
          return <Habit key={habitKey} habit={userData.habits[habitKey]} />;
        })}
      </div>
    </div>
  );
};

const Habit = ({
  key,
  habit,
}: {
  key: string;
  habit: {
    name: string;
    description: string;
    frequency: Array<number>;
  };
}) => {
  const { name, frequency, description } = habit;
  return (
    <div className="p-3 pl-0">
      <div className="grid lg:grid-cols-2 lg:gap-5">
        <div>
          <h2 className="text-lg">{name}</h2>
          <p className="text-[#949494] max-w-sm">{description}</p>
        </div>
        <div className="flex gap-1 mt-3 lg:mt-0 self-center align-middle">
          {Object.keys(weekdaysTable).map((key: string, index: number) => {
            let selected = frequency.includes(index);
            return (
              <span
                className="rounded-full w-[40px] h-[40px] justify-center items-center flex"
                style={{
                  backgroundColor: selected ? "#f87E3A" : "#fcfbf9",
                  color: selected ? "white" : "black",
                }}
              >
                {weekdaysTable[key]}
              </span>
            );
          })}
          <div className="ml-3">
            {/* Edit link */}
            <Tooltip title={"edit habit"}>
              <Link href={`/edit-habit/${key}`} passHref>
                <IconButton aria-label={"edit habit"}>
                  <Edit />
                </IconButton>
              </Link>
            </Tooltip>

            {/* Delete button */}
            <Tooltip title={"delete habit"}>
              <IconButton
                // onClick={handleDeleteClick}
                aria-label={"delete habit"}
                // disabled={disableActions}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </div>
        </div>
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
      <div className="min-h-[calc(100vh-4rem)] items-center justify-center align-middle flex bg-white p-3 rounded-3xl md:-translate-y-12 ">
        {page}
      </div>
    </DashboardLayout>
  );
};

export default manageHabitsPage;

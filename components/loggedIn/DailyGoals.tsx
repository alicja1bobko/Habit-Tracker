import React, { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
type Props = {};

type Goal = {
  habit: string;
  id: number;
};

const habits = ["journaling", "meditation", "wake up at 6am", "joga"];

const Goal = ({ habit, id }: Goal) => {
  const [isDone, setIsDone] = useState(false);

  const handleClick = () => {
    setIsDone((current) => !current);
  };

  return (
    <div key={id} className="mb-8">
      <div
        className="flex flex-col rounded-3xl w-full m-3 lg:w-1/2 xl:m-0 xl:w-full transition-all"
        style={{ backgroundColor: isDone ? "#318a31" : "#fcfbf9" }}
      >
        <div className="p-5">
          <h3
            className="font-bold capitalize"
            style={{ color: isDone ? "white" : "black" }}
          >
            {habit}
          </h3>
          <p
            className="text-sm whitespace-nowrap"
            style={{ color: isDone ? "white" : "#b9b8b8" }}
          >
            Every day
          </p>
        </div>
        <button
          className="text-white text-center text-sm p-2 w-full rounded-b-3xl transition-all h-[40px]"
          style={{ backgroundColor: isDone ? "#1f681f" : "#F87E3A" }}
          onClick={() => handleClick()}
        >
          {isDone ? (
            <>
              Done &nbsp;
              <DoneIcon className="scale-90" />
            </>
          ) : (
            "Mark as done"
          )}
        </button>
      </div>
    </div>
  );
};

const DailyGoals = (props: Props) => {
  const habitsList = habits.map((habit, index) => {
    return <Goal habit={habit} id={index} key={index} />;
  });

  return (
    <>
      <h3 className="font-bold text-lg mb-2 mt-2">Habits</h3>
      {habitsList}
    </>
  );
};

export default DailyGoals;

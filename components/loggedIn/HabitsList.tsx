import React, { MouseEventHandler } from "react";

type Props = {
  habitNames: string[];
  weekView: boolean;
  selectedHabit: number;
  handleSelectedHabit: (index: number) => void;
};

export const HabitsList = ({
  habitNames,
  weekView,
  selectedHabit,
  handleSelectedHabit,
}: Props) => {
  const habitNamesLength = habitNames.length;
  if (habitNamesLength === 0) {
    return <p>Create some habits to see progress</p>;
  }
  return (
    <>
      <div
        className={`grid grid-rows-${habitNames.length} grid-cols-1 gap-y-4`}
      >
        {habitNames.map((habitName, index) => {
          return weekView === true ? (
            <div key={index} className="font-semibold self-center">
              {habitName}
            </div>
          ) : (
            <button
              key={index}
              className="text-left cursor-pointer font-semibold"
              onClick={() => handleSelectedHabit(index)}
              style={{ color: selectedHabit === index ? "black" : "#949494" }}
            >
              {habitName}
            </button>
          );
        })}
      </div>
    </>
  );
};

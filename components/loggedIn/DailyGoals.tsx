import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { db } from "../../pages/api/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useAuth from "../../context/auth-context";
import { weekdaysTable } from "../../utils/weekdays";

type Goal = {
  habit: any;
  key: number;
  habitKey: string;
  checkmarkKey: string;
  isCompleted: boolean;
};

const Goal = ({ habit, habitKey, checkmarkKey, isCompleted }: Goal) => {
  const { user } = useAuth();
  const [isDone, setIsDone] = useState<boolean>(isCompleted);

  let frequency: string[] = [];
  habit.frequency.map((num: number) => {
    frequency.push(weekdaysTable[num]);
  });

  const handleClick = () => {
    setIsDone((current) => !current);
  };

  useEffect(() => {
    handleCheckedChange(isDone, habitKey, checkmarkKey, user);
  }, [isDone]);

  return (
    <div className="mb-8">
      <div
        className="flex flex-col rounded-3xl w-full m-3 lg:w-1/2 xl:m-0 xl:w-full transition-all"
        style={{ backgroundColor: isDone ? "#318a31" : "#fcfbf9" }}
      >
        <div className="p-5">
          <h3
            className="font-bold capitalize"
            style={{ color: isDone ? "white" : "black" }}
          >
            {habit.name}
          </h3>
          <p
            className="text-sm whitespace-nowrap mt-1"
            style={{ color: isDone ? "white" : "#b9b8b8" }}
          >
            {frequency.length == 6 ? "Everyday" : frequency.join(", ")}
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

interface IDailyGoals {
  habits: {
    [key: string]: {
      name: string;
      description: string;
      frequency: Array<number>;
    };
  };
  checkmarks: {
    [key: string]: {
      habitId: string;
      date: number;
      completed: boolean;
    };
  };
}

const DailyGoals = ({ habits, checkmarks }: IDailyGoals) => {
  const habitsKeys = Object.keys(habits);
  const checkmarkKeys = Object.keys(checkmarks);
  const habitsList = habitsKeys.map((habitKey, index) => {
    let checkmarkKey = checkmarkKeys.find((key) => {
      return checkmarks[key].habitId == habitKey;
    }) as string;

    let isCompleted = checkmarks[checkmarkKey].completed;
    let date = new Date(checkmarks[checkmarkKey].date);
    console.log(date);
    return (
      <Goal
        habit={habits[habitKey]}
        key={index}
        habitKey={habitKey}
        checkmarkKey={checkmarkKey}
        isCompleted={isCompleted}
      />
    );
  });
  return (
    <>
      <h3 className="font-bold text-lg mb-2 mt-2">Habits</h3>
      {habitsList}
    </>
  );
};

export default DailyGoals;

/* function to update document in firestore */
const handleCheckedChange = async (
  isDone: boolean,
  habitKey: string,
  checkmarkKey: string,
  user: any
) => {
  const checkmarkDoc = doc(db, `users/${user?.uid}/checkmarks/${checkmarkKey}`);
  try {
    await updateDoc(checkmarkDoc, { completed: isDone });
  } catch (err) {
    alert(err);
  }
};

export { handleCheckedChange };

import { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import useAuth from "../../../context/auth-context";
import { weekdaysTable } from "../../../utils/weekdays";
import { db } from "../../../pages/api/firebase";
import { doc, updateDoc } from "firebase/firestore";

type Goal = {
  habit: any;
  key: number;
  checkmarkKey: string;
  isCompleted: boolean;
};

export const Goal = ({ habit, checkmarkKey, isCompleted }: Goal) => {
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
    setIsDone(isCompleted);
  }, [isCompleted]);

  useEffect(() => {
    handleCheckedChange(isDone, checkmarkKey, user);
  }, [isDone]);

  return (
    <div className="mb-8">
      <div
        className="flex flex-col rounded-3xl w-full lg:m-3 lg:w-1/2 xl:m-0 xl:w-full transition-all"
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
            {frequency.length === 7 ? "Everyday" : frequency.join(", ")}
          </p>
        </div>
        <button
          className="text-white text-center text-sm p-2 w-full rounded-b-3xl transition-all h-[40px]"
          style={{ backgroundColor: isDone ? "#1f681f" : "#f87e3a" }}
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

/* function to update document in firestore */
const handleCheckedChange = async (
  isDone: boolean,
  checkmarkKey: string,
  user: any
) => {
  const checkmarkDoc = doc(db, `users/${user?.uid}/checkmarks/${checkmarkKey}`);
  try {
    await updateDoc(checkmarkDoc, { completed: isDone });
  } catch (err) {
    console.log(err);
  }
};

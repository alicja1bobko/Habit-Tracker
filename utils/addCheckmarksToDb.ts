import { lightFormat } from "date-fns";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
import { db } from "../pages/api/firebase";
import { daysList } from "./daysRangeList";
import { normaliZeWeekdayFromDate } from "./weekdays";

type Props = {
  frequency: number[];
  user: User | null;
  docRef: DocumentReference<DocumentData>;
};

// add checkmarks for this habit for past week

export const addCheckmarksToDb = ({ frequency, user, docRef }: Props) => {
  const pastWeek = daysList(7);
  Object.entries(pastWeek).map(async (entry) => {
    let i = entry[0];
    let date = entry[1];
    const weekday = normaliZeWeekdayFromDate(date);
    if (frequency.filter((day) => day == weekday).length > 0) {
      const checkmarksDoc = collection(db, `users/${user?.uid}/checkmarks`);
      await addDoc(checkmarksDoc, {
        completed: false,
        habitId: docRef.id,
        date: lightFormat(date, "d-M-yyy"),
      });
    }
  });
};

import { addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "../../../pages/api/firebase";
import { User } from "firebase/auth";

export const addCheckmarksToDb = async (
  selectedDaysHabitKeys: string[],
  selectedDay: string,
  user: User | null
) => {
  const checkmarksDoc = collection(db, `users/${user?.uid}/checkmarks`);
  const promises = selectedDaysHabitKeys.map(async (habitKey) => {
    const docRef = await addDoc(checkmarksDoc, {
      completed: false,
      habitId: habitKey,
      date: selectedDay,
    });
    const docSnap = await getDoc(docRef);
    return { [docRef.id]: docSnap.data() };
  });

  return await Promise.all(promises);
};

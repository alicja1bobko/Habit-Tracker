import { addDoc, collection, getDoc } from "firebase/firestore";
import useAuth from "../../../context/auth-context";
import { db } from "../../../pages/api/firebase";

export const addCheckmarksToDb = async (
  selectedDaysHabitKeys: string[],
  selectedDay: string
) => {
  const { user } = useAuth();
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

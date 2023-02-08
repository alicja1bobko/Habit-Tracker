import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../pages/api/firebase";
import { getToday } from "../utils/getToday";

export default async function setSampleUserDatabase(uid: string) {
  const today = getToday();
  const userRef = setDoc(doc(db, "users", uid), {});
  const habitsDoc = collection(db, `users/${uid}/habits`);
  const checkmarksCol = collection(db, `users/${uid}/checkmarks`);
  const settingsCol = collection(db, `users/${uid}/settings`);

  await addDoc(habitsDoc, {
    name: "Wake up at 6am",
    description:
      "Wake up 1 hour before normal wake up time for mindful activities",
    frequency: [0, 1, 2, 3, 4],
  });

  await addDoc(settingsCol, {
    name: "Gorgeous Friend",
  });

  await addDoc(checkmarksCol, {
    habitId: "habit-one",
    date: today,
    completed: false,
  });
}

import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../pages/api/firebase";

export default async function setSampleUserDatabase(uid: string) {
  const userRef = setDoc(doc(db, "users", uid), {});
  const habitsDoc = doc(db, `users/${uid}/habits`, "habit-one");
  const checkmarksCol = collection(db, `users/${uid}/checkmarks`);
  const settingsCol = collection(db, `users/${uid}/settings`);

  await setDoc(habitsDoc, {
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
    date: Date.now(),
    completed: false,
  });
}

import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../pages/api/firebase";
import { getToday } from "../utils/getToday";

export default async function setSampleUserDatabase(uid: string) {
  const today = getToday();
  const userRef = setDoc(doc(db, "users", uid), {});
  const habitsDoc = await addDoc(collection(db, `users/${uid}/habits`), {
    name: "Wake up at 6am",
    description:
      "Wake up 1 hour before normal wake up time for mindful activities",
    frequency: [0, 1, 2, 3, 4],
  });
  const habitsDoc2 = await addDoc(collection(db, `users/${uid}/habits`), {
    name: "Reading",
    description: "Read at least 10 pages a day",
    frequency: [0, 1, 2, 3, 4, 5, 6],
  });
  const habitsDoc3 = await addDoc(collection(db, `users/${uid}/habits`), {
    name: "Exercise",
    description: "Go to the gym",
    frequency: [0, 2, 4],
  });
  const habitsDoc4 = await addDoc(collection(db, `users/${uid}/habits`), {
    name: "Spanish ",
    description: "Learn 5 new words",
    frequency: [0, 1, 2, 3, 4],
  });

  const settingsCol = collection(db, `users/${uid}/settings`);

  await addDoc(settingsCol, {
    name: "Gorgeous Friend",
  });
}

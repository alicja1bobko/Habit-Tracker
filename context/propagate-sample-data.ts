import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../pages/api/firebase";
import { getToday } from "../utils/getToday";

async function setSampleUserDatabase(uid: string) {
  const userRef = await setDoc(doc(db, "users", uid), {});
  const habitsDocs = [
    {
      name: "Wake up at 6am",
      description:
        "Wake up 1 hour before normal wake up time for mindful activities",
      frequency: [0, 1, 2, 3, 4],
    },
    {
      name: "Reading",
      description: "Read at least 10 pages a day",
      frequency: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      name: "Exercise",
      description: "Go to the gym",
      frequency: [0, 2, 4],
    },
  ].map((habit) => addDoc(collection(db, `users/${uid}/habits`), habit));

  const settingsCol = collection(db, `users/${uid}/settings`);
  const settingsDoc = addDoc(settingsCol, {
    lastName: "Anonymous",
  });

  await Promise.all([...habitsDocs, userRef, settingsDoc]);
}
async function setEmptyUserDatabase(uid: string) {
  const userRef = setDoc(doc(db, "users", uid), {});

  const settingsCol = collection(db, `users/${uid}/settings`);
  const settingsDoc = await addDoc(settingsCol, {
    lastName: "Anonymous",
  });

  await Promise.all([userRef, settingsDoc]);
}

export { setEmptyUserDatabase, setSampleUserDatabase };

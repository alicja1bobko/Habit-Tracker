import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../pages/api/firebase";
import { useFirestore } from "./firestore-context";

export default async function setSampleUserDatabase(uid: string) {
  const { db } = useFirestore();
  const userRef = await setDoc(doc(db, "users", uid), {
    name: "Gorgeous Friend",
  });
  const habitsRef = collection(db, `users/${uid}/habits`);
  const checkmarksRef = collection(db, `users/${uid}/checkmarks`);

  await addDoc(habitsRef, {
    name: "Wake up at 6am",
    description:
      "Wake up 1 hour before normal wake up time for mindful activities",
    frequency: [0, 1, 2, 3, 4],
  });
}

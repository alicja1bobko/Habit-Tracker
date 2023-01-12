import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
// import useAuth from "../context/auth-context";
// import { useFirestore } from "../context/firestore-context";
// import { db } from "../pages/api/firebase";

// /* function to update document in firestore */
// const handleCheckedChange = async (isDone: boolean, myKey: string) => {
//   //   const db = useFirestore();
//   const { user } = useAuth();
//   console.log(isDone);
//   const checkmarkDoc = doc(db, `users/${user?.uid}/checkmarks`);
//     try {
//       await updateDoc(checkmarkDoc, {
//         habitId: "habit-one",
//         date: serverTimestamp(),
//         completed: false,
//       });
//     } catch (err) {
//       alert(err);
//     }
// };

// export { handleCheckedChange };

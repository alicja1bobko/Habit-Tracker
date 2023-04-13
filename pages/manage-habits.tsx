import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { ReactElement, useEffect, useState } from "react";
import { ManageHabit } from "../components/loggedIn/ManageHabit";
import { NoHabits } from "../components/NoHabits";
import useAuth from "../context/auth-context";
import { IUserData, useUser } from "../context/user-context";
import DashboardLayout from "../Layouts/DashboardLayout";
import { db } from "./api/firebase";
import { NextPageWithLayout } from "./_app";

const manageHabitsPage: NextPageWithLayout = () => {
  const { user } = useAuth();
  const userData: IUserData = useUser();
  const [habitKeys, setHabitKeys] = useState<string[]>([]);

  useEffect(() => {
    const habitsRef = collection(db, `users/${user?.uid}/habits`);
    onSnapshot(habitsRef, (querySnapshot) => {
      setHabitKeys(querySnapshot.docs.map((doc) => doc.id));
    });
  }, [userData]);

  if (Object.keys(habitKeys).length === 0) {
    return <NoHabits />;
  }

  const deleteHabit = async (habitKey: string) => {
    await deleteDoc(doc(db, `users/${user?.uid}/habits/${habitKey}`));

    const checkmarkKeys = Object.keys(userData.checkmarks);
    checkmarkKeys.forEach(async (checkmarkKey) => {
      if (userData.checkmarks[checkmarkKey].habitId === habitKey) {
        await deleteDoc(
          doc(db, `users/${user?.uid}/checkmarks/${checkmarkKey}`)
        );
      }
    });
  };

  return (
    <div className="flex flex-col p-5 md:p-10">
      {habitKeys.length !== 0 && (
        <h1 className="text-4xl font-bolder mb-3">Manage habits</h1>
      )}
      <div className="mt-5">
        {habitKeys.map((habitKey, index) => {
          return (
            <ManageHabit
              key={index}
              habitKey={habitKey}
              habit={userData.habits[habitKey]}
              deleteHabit={deleteHabit}
            />
          );
        })}
      </div>
    </div>
  );
};

manageHabitsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout
      meta={{
        title: "Habit tracker | Manage habits",
        description: "Habit tracker Manage Habits Subpage",
      }}
    >
      <div className="subpage-layout">{page}</div>
    </DashboardLayout>
  );
};

export default manageHabitsPage;

import { collection, onSnapshot } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useAuth from "./auth-context";
import { db } from "../pages/api/firebase";

const UserContext = createContext<Object | null>(null);
UserContext.displayName = "UserContext";

interface IUserData {
  habits: {
    [key: string]: {
      name: string;
      description: string;
      frequency: Array<number>;
    };
  };
  checkmarks: {
    [key: string]: {
      habitId: string;
      date: string;
      value: string;
    };
  };
  settings: {
    name: string;
  };
}

function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  // const [error, setError] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (userData !== null) {
      setIsLoading(false);
      setIsSuccess(true);
    }
  }, [userData]);

  useEffect(() => {
    const habitsRef = collection(db, `users/${user?.uid}/habits`);
    const checkmarksRef = collection(db, `users/${user?.uid}/checkmarks`);
    const settingsRef = collection(db, `users/${user?.uid}/settings`);

    //real time update
    //habits
    onSnapshot(habitsRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setUserData((prev: any) => ({
          ...prev,
          habits: {
            [doc.id]: doc.data(),
          },
        }));
      });
    });
    //checkmarks
    onSnapshot(checkmarksRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setUserData((prev: any) => ({
          ...prev,
          checkmarks: {
            [doc.id]: doc.data(),
          },
        }));
      });
    });
    //settings
    onSnapshot(settingsRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setUserData((prev: any) => ({ ...prev, settings: doc.data() }));
      });
    });

    // return () => unsubscribe();
  }, [user, db, setUserData]);

  // User data is loading
  if (isLoading) {
    return <div>Loading</div>;
  }

  // Error when loading user data
  // if (error) {
  //   return <div>Error</div>;
  // }

  if (isSuccess) {
    console.log(userData);
    return (
      <UserContext.Provider value={userData}>{children}</UserContext.Provider>
    );
  }
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export { UserProvider, useUser };

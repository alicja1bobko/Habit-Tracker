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
import { FullPageSpinner } from "../components/Spinners";

export const initializeUserData = {
  habits: {},
  checkmarks: {},
  settings: {},
};

export interface IUserData {
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
      completed: boolean;
    };
  };
  settings: {
    [key: string]: {
      firstName: string;
      lastName: string;
      password: string;
      email: string;
      image: string;
    };
  };
}

//empty value as default
const UserContext = createContext<IUserData>(initializeUserData);
UserContext.displayName = "UserContext";

function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<IUserData>(initializeUserData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { user, logout } = useAuth();

  useEffect(() => {
    if (user !== null) {
      setIsLoading(false);
      setIsSuccess(true);
    }
    if (user == null) {
      setUserData(initializeUserData);
    }
  }, [user]);

  useEffect(() => {
    let isMounted = true;
    const habitsRef = collection(db, `users/${user?.uid}/habits`);
    const checkmarksRef = collection(db, `users/${user?.uid}/checkmarks`);
    const settingsRef = collection(db, `users/${user?.uid}/settings`);

    //checkmarks
    onSnapshot(
      checkmarksRef,
      (snapshot) => {
        if (isMounted) {
          snapshot.docs.forEach((doc) => {
            setUserData((prev: any) => ({
              ...prev,
              checkmarks: {
                ...prev.checkmarks,
                [doc.id]: doc.data(),
              },
            }));
          });
        }
      },
      (error) => {
        console.log(error.message);
        if (user === null) logout();
        setIsLoading(false);
      }
    );

    //real time update
    //habits
    onSnapshot(
      habitsRef,
      (snapshot) => {
        if (isMounted) {
          if (snapshot.docs.length === 0)
            setUserData((prev) => ({ ...prev, habits: {} }));
          snapshot.docs.forEach((doc) => {
            setUserData((prev: any) => ({
              ...prev,
              habits: {
                ...prev.habits,
                [doc.id]: doc.data(),
              },
            }));
          });
        }
      },
      (error) => {
        console.log(error.message);
        if (user === null) logout();
        setIsLoading(false);
      }
    );

    //settings
    onSnapshot(
      settingsRef,
      (snapshot) => {
        if (isMounted) {
          snapshot.docs.forEach((doc) => {
            setUserData((prev: any) => ({
              ...prev,
              settings: { [doc.id]: doc.data() },
            }));
          });
        }
      },
      (error) => {
        console.log(error.message);
        if (user === null) logout();
        setIsLoading(false);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [user, db, setUserData]);

  // User data is loading
  // if (isLoading) {
  //   return <FullPageSpinner />;
  // }
  // styles for sign up don't load
  if (isSuccess) {
    return (
      <UserContext.Provider value={userData}>{children}</UserContext.Provider>
    );
  }

  return <>{children}</>;
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export { UserProvider, useUser };

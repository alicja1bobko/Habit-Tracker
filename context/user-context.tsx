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

const UserContext = createContext<IUserData | null>(null);
UserContext.displayName = "UserContext";

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
      date: number;
      completed: boolean;
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
  const [error, setError] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (userData !== null) {
      setIsLoading(false);
      setIsSuccess(true);
    }
  }, [userData]);

  useEffect(() => {
    let isMounted = true;
    const habitsRef = collection(db, `users/${user?.uid}/habits`);
    const checkmarksRef = collection(db, `users/${user?.uid}/checkmarks`);
    const settingsRef = collection(db, `users/${user?.uid}/settings`);

    //real time update
    //habits
    onSnapshot(
      habitsRef,
      (snapshot) => {
        if (isMounted) {
          snapshot.docs.forEach((doc) => {
            setUserData((prev: any) => ({
              ...prev,
              habits: {
                [doc.id]: doc.data(),
              },
            }));
          });
        }
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      }
    );
    //checkmarks
    onSnapshot(
      checkmarksRef,
      (snapshot) => {
        if (isMounted) {
          snapshot.docs.forEach((doc) => {
            setUserData((prev: any) => ({
              ...prev,
              checkmarks: {
                [doc.id]: doc.data(),
              },
            }));
          });
        }
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      }
    );
    //settings
    onSnapshot(
      settingsRef,
      (snapshot) => {
        if (isMounted) {
          snapshot.docs.forEach((doc) => {
            setUserData((prev: any) => ({ ...prev, settings: doc.data() }));
          });
        }
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      }
    );
    return () => {
      isMounted = false;
    };
    // return () => unsubscribe();
  }, [user, db, setUserData]);

  // User data is loading
  // if (isLoading) {
  //   return <div>Loading</div>;
  // }

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

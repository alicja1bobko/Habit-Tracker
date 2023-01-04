import { doc, getDoc, onSnapshot } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useAuth from "./auth-context";
import { useFirestore } from "./firestore-context";
// import { db } from "../pages/api/firebase";

const UserContext = createContext<any | null>(null);
UserContext.displayName = "UserContext";

function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { user } = useAuth();
  const { db } = useFirestore();

  // useEffect(() => {
  //   // const userDataRef = doc(db, `users/${user?.uid}`);
  //   // const userDataSnap = async () => {
  //   //   return await getDoc(userDataRef);
  //   // };
  //   console.log(db);
  //   const unsub = onSnapshot(doc(db, `users/${user?.uid}`), (doc) => {
  //     console.log("Current data: ", doc.data());
  //   });
  // }, [db, user, setUserData]);

  const isSuccess = user?.uid !== null;

  // User data is loading
  // if (isLoading) {
  //   return <div>Loading</div>;
  // }

  // Error when loading user data
  if (error) {
    return <div>Error</div>;
  }

  if (isSuccess) {
    setIsLoading(false);
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

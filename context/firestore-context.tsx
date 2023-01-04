import React, { createContext, ReactNode, useContext } from "react";
import db from "../pages/api/firebase";
import "firebase/firestore";

// Context

const FirestoreContext = createContext<any | null>(null);
FirestoreContext.displayName = "FirebaseContext";

// Provider
const FirestoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <FirestoreContext.Provider value={db}>{children}</FirestoreContext.Provider>
  );
};

// Hook
function useFirestore() {
  const context = useContext(FirestoreContext);

  if (context === undefined) {
    throw new Error("useFirebase must be used within FirestoreProvider");
  }

  return context;
}

export { FirestoreProvider, useFirestore };

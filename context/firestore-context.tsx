import React, { createContext, useContext } from "react";
import app, { db } from "../pages/api/firebase";
import "firebase/firestore";

// Context

const FirestoreContext = createContext<any | null>(null);

// Provider
const FirestoreProvider = ({ children }: { children: React.ReactNode }) => {
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

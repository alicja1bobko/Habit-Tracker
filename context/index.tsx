import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { FirestoreProvider } from "./firestore-context";
import { UserProvider } from "./user-context";

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <FirestoreProvider>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </FirestoreProvider>
  );
};

export { AppProviders };

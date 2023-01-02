import { AuthProvider } from "./auth-context";
import { FirestoreProvider } from "./firestore-context";

const AppProviders = ({ children }) => {
  return (
    <FirestoreProvider>
      <AuthProvider>{children}</AuthProvider>
    </FirestoreProvider>
  );
};

export { AppProviders };

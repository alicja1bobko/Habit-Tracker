import { AuthProvider, ProtectRoute } from "./auth-context";
import { FirestoreProvider } from "./firestore-context";
import { UserProvider } from "./user-context";

const AppProviders = ({ children }) => {
  return (
    <FirestoreProvider>
      <AuthProvider>
        <ProtectRoute>
          <UserProvider>{children}</UserProvider>
        </ProtectRoute>
      </AuthProvider>
    </FirestoreProvider>
  );
};

export { AppProviders };

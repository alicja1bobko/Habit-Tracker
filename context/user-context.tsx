import { createContext, ReactNode, useContext } from "react";
import { User } from "firebase/auth";
import useAuth from "./auth-context";

const { user } = useAuth();

const UserContext = createContext({
  data: null,
  error: null,
  loading: false,
});

// function UserProvider({ children }: ReactNode) {}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

// export { UserProvider, useUser };

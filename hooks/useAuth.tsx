import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useState, createContext, useEffect, useMemo, useContext } from "react";
import { auth } from "../firebase";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUpWithFacebookProvider: () => void;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUpWithFacebookProvider: async () => {},
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Logged in
        setUser(user);
        setLoading(false);
      } else {
        // Not logged in
        setUser(null);
        setLoading(true);
        // router.push("/sign-in");
      }
      setInitialLoading(false);
    }),
      [auth];
  });

  const router = useRouter();

  // Sign up with email and password

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/habit-dashboard");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  // Sign in with Provider

  const signUpWithFacebookProvider = () => {
    setLoading(true);
    const provider = new FacebookAuthProvider();
    provider.addScope("email");
    const auth = getAuth();
    console.log(auth, provider);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
      })
      .finally(() => setLoading(false));
  };

  // Sign in with email and password

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/habit-dashboard");
        setLoading(false);
      })
      .catch((error) => console.log(error.message))
      .finally(() => setLoading(false));
  };
  const logout = async () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => console.log(error.message))
      .finally(() => setLoading(false));
  };
  const memoizedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      error,
      loading,
      logout,
      signUpWithFacebookProvider,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

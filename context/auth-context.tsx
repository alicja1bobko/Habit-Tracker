import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInAnonymously,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useRouter } from "next/router";
import {
  useState,
  createContext,
  useEffect,
  useMemo,
  useContext,
  ReactNode,
} from "react";
import { auth } from "../pages/api/firebase";
import setSampleUserDatabase from "./propagate-sample-data";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUpWithGithubProvider: () => void;
  signUpWithFacebookProvider: () => void;
  signUpWithGoogleProvider: () => void;
  signUpAnonymously: () => void;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
  initialLoading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUpWithFacebookProvider: async () => {},
  signUpWithGithubProvider: async () => {},
  signUpWithGoogleProvider: async () => {},
  signUpAnonymously: async () => {},
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
  initialLoading: true,
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
        setSampleUserDatabase(userCredential.user.uid);
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
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
        if (isNewUser) setSampleUserDatabase(user.uid);
        router.push("/habit-dashboard");
        setLoading(false);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
      })
      .finally(() => setLoading(false));
  };

  const signUpWithGithubProvider = () => {
    setLoading(true);
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
        if (isNewUser) setSampleUserDatabase(user.uid);
        router.push("/habit-dashboard");
        setLoading(false);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        const credential = GithubAuthProvider.credentialFromError(error);
      })
      .finally(() => setLoading(false));
  };

  const signUpWithGoogleProvider = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
        if (isNewUser) setSampleUserDatabase(user.uid);
        router.push("/habit-dashboard");
        setLoading(false);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      })
      .finally(() => setLoading(false));
  };

  const signUpAnonymously = () => {
    setLoading(true);
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        router.push("/habit-dashboard");
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
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
      .catch((error) => setError(error.message))
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
      signUpWithGithubProvider,
      signUpWithGoogleProvider,
      signUpAnonymously,
      initialLoading,
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

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { user, initialLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initialLoading) {
      //auth is initialized and there is no user
      if (!user) {
        // redirect
        router.push("/sign-in");
      }
    }
  }, [initialLoading, router, user]);

  /* show loading indicator while the auth provider is still initializing */
  if (initialLoading) {
    return <div>Loading..</div>;
  }

  // if auth initialized with a valid user show protected page
  if (!initialLoading && user) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}

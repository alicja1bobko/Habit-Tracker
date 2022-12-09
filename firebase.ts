// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoihtwU8jXiUTiSK0ZxdGpEyzcWo4fvr4",
  authDomain: "habit-tracker-app-pf.firebaseapp.com",
  projectId: "habit-tracker-app-pf",
  storageBucket: "habit-tracker-app-pf.appspot.com",
  messagingSenderId: "88178403321",
  appId: "1:88178403321:web:9bc73423c9566b5ff17f28",
  measurementId: "G-PGHEXERBHG",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
// const analytics = getAnalytics(app);

export default app;
export { auth, db };

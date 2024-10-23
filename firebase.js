import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARABxP7GXpGxJ2b5uwhoiiDkbbZMvxAgU",
  authDomain: "webcalendar-377bb.web.app",
  projectId: "webcalendar-377bb",
  storageBucket: "webcalendar-377bb.appspot.com",
  messagingSenderId: "467584309604",
  appId: "1:467584309604:web:465fe5cd404a846b330271",
  measurementId: "G-6V3X8X1Z8Y",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, analytics, db, auth, provider };

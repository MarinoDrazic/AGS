import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Hardcoded config for the demo.
const firebaseConfig = {
  apiKey: "AIzaSyAh5bhWUMc3Gum7mSo9pFDvB-ZRwNA53Es",
  authDomain: "automated-grading-system-5fd3d.firebaseapp.com",
  projectId: "automated-grading-system-5fd3d",
  storageBucket: "automated-grading-system-5fd3d.appspot.com",
  messagingSenderId: "578110986900",
  appId: "1:578110986900:web:65808c7226069f915d3281",
  measurementId: "G-WBNXDCMTSV",
};
let analytics;
let db;
let auth;
if (firebaseConfig?.projectId) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  if (app.name && typeof window !== "undefined") {
    analytics = getAnalytics(app);
    auth = getAuth(app);
  }

  // Access Firebase services using shorthand notation
  db = getFirestore(app);
}

export { analytics, db, auth };

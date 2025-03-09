import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtDyDFhD_1_x0IsVSQ5uTyHQbx6Qeb_CQ",
  authDomain: "jobswitcher-709d4.firebaseapp.com",
  projectId: "jobswitcher-709d4",
  storageBucket: "jobswitcher-709d4.firebasestorage.app",
  messagingSenderId: "625864086995",
  appId: "1:625864086995:web:1b302802b503688aae4b26",
  measurementId: "G-45KFRYRT08"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db }; 
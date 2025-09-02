// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "familyverse-yt5vs",
  appId: "1:1040928765696:web:ea81880e7141b69a60e5e5",
  storageBucket: "familyverse-yt5vs.firebasestorage.app",
  apiKey: "AIzaSyAUeaWDzhP3shXUzyKsucnnN_78TUZbn7w",
  authDomain: "familyverse-yt5vs.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "1040928765696"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };

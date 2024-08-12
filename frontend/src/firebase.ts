// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl_T1QhDVxTm7EljT58uQYcnufPA29SKE",
  authDomain: "jobfinder-e2908.firebaseapp.com",
  projectId: "jobfinder-e2908",
  storageBucket: "jobfinder-e2908.appspot.com",
  messagingSenderId: "340218283640",
  appId: "1:340218283640:web:4845d2ef9c23700f694f8d",
  measurementId: "G-THPQ65FTQL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Firebase Authentication

export { db, auth };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC3ZQL_UYMenQePI9Z7sER0izlAOfURL4",
  authDomain: "neighborly-eb04b.firebaseapp.com",
  projectId: "neighborly-eb04b",
  storageBucket: "neighborly-eb04b.firebasestorage.app",
  messagingSenderId: "563088836586",
  appId: "1:563088836586:web:8c9a90c351202298d11493"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app; 
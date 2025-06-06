"use client";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import type { Analytics } from "firebase/analytics";
import { useReducer } from 'react';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDC3ZQL_UYMenQePI9Z7sER0izlAOfURL4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "neighborly-eb04b.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "neighborly-eb04b",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "neighborly-eb04b.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "563088836586",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:563088836586:web:8c9a90c351202298d11493",
};

// Initialize Firebase with error handling
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Firebase initialization failed:", error);
  
  // Provide a fallback or mock app if needed
  app = initializeApp({ apiKey: "" }); // Dummy config to prevent crashes
}

export const auth = getAuth(app);
export const db = getFirestore(app);
// Conditionally initialize Analytics only in browser environment with error handling
export let analytics: Analytics | null = null;
try {
  analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
} catch (error) {
  console.error("Failed to initialize Firebase Analytics:", error);
}
export const storage = getStorage(app);
export default app; 

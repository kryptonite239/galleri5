import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyA62EBpfhkyYCzPhZLZuTEc4rKyXPzBV4I",
  authDomain: "linkfolio-c7ca1.firebaseapp.com",
  projectId: "linkfolio-c7ca1",
  storageBucket: "linkfolio-c7ca1.appspot.com",
  messagingSenderId: "646426666079",
  appId: "1:646426666079:web:e54fd0ed681e9c275d27ea",
  measurementId: "G-E7K6ZR3YLP",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

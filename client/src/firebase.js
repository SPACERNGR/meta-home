// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "meta-home-70ace.firebaseapp.com",
  projectId: "meta-home-70ace",
  storageBucket: "meta-home-70ace.firebasestorage.app",
  messagingSenderId: "303299494310",
  appId: "1:303299494310:web:7510d860b4c000d9f3cf67",
  measurementId: "G-TK7YH9QWLT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
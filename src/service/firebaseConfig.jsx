// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqdfc2XFKrlC7gQvJhrdAQXARLFNx8JMA",
  authDomain: "travel-planner-eeb95.firebaseapp.com",
  projectId: "travel-planner-eeb95",
  storageBucket: "travel-planner-eeb95.appspot.com",
  messagingSenderId: "767158786087",
  appId: "1:767158786087:web:47ab175ac5247a13895602",
  measurementId: "G-4RT7Y4H55Z",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

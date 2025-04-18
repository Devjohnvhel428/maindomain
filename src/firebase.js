// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM57vzNLlA1as-0GflycGbjm40IL90HOU",
  authDomain: "enviro-test-ec923.firebaseapp.com",
  databaseURL: "https://enviro-test-ec923-default-rtdb.firebaseio.com",
  projectId: "enviro-test-ec923",
  storageBucket: "enviro-test-ec923.firebasestorage.app",
  messagingSenderId: "760148814984",
  appId: "1:760148814984:web:6b51591a7a264fb81d833d",
  measurementId: "G-TFRJFV3DQ8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
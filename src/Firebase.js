// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuRSI0lqokqoGTVNwJHHIOu68lEnN_PZk",
  authDomain: "zeon-store-78a88.firebaseapp.com",
  projectId: "zeon-store-78a88",
  storageBucket: "zeon-store-78a88.appspot.com",
  messagingSenderId: "75139899774",
  appId: "1:75139899774:web:5dec1b9bcc9e5eeb11532f",
  measurementId: "G-Y36WY9562P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATssNsRXFBLGQmY7CTwAj-aAwzXSRmIq4",
  authDomain: "ceylonagrigrow.firebaseapp.com",
  projectId: "ceylonagrigrow",
  storageBucket: "ceylonagrigrow.appspot.com",
  messagingSenderId: "37139476781",
  appId: "1:37139476781:web:0e0bc34d32d79faea4a3a4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
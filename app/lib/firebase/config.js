// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const firebaseConfig = {
    apiKey: "AIzaSyCXSQcYiIK6ERzr1AFCUW2dSWru5Sv5ARw",
    authDomain: "diarko-fcm.firebaseapp.com",
    projectId: "diarko-fcm",
    storageBucket: "diarko-fcm.appspot.com",
    messagingSenderId: "137868198330",
    appId: "1:137868198330:web:1b8858086412b6c9271d83",
    measurementId: "G-9GGRYDDPP9"
  }
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCXSQcYiIK6ERzr1AFCUW2dSWru5Sv5ARw",
    authDomain: "diarko-fcm.firebaseapp.com",
    projectId: "diarko-fcm",
    storageBucket: "diarko-fcm.appspot.com",
    messagingSenderId: "137868198330",
    appId: "1:137868198330:web:1b8858086412b6c9271d83",
    measurementId: "G-9GGRYDDPP9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
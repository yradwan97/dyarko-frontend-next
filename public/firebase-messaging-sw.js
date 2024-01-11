importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCXSQcYiIK6ERzr1AFCUW2dSWru5Sv5ARw",
  authDomain: "diarko-fcm.firebaseapp.com",
  projectId: "diarko-fcm",
  storageBucket: "diarko-fcm.appspot.com",
  messagingSenderId: "137868198330",
  appId: "1:137868198330:web:1b8858086412b6c9271d83",
});

const messaging = firebase.messaging();
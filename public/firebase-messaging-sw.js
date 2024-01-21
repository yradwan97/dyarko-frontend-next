importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCXSQcYiIK6ERzr1AFCUW2dSWru5Sv5ARw",
  authDomain: "diarko-fcm.firebaseapp.com",
  projectId: "diarko-fcm",
  storageBucket: "diarko-fcm.appspot.com",
  messagingSenderId: "137868198330",
  appId: "1:137868198330:web:1b8858086412b6c9271d83",
  measurementId: "G-9GGRYDDPP9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
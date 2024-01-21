import "firebase/messaging";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import localforage from "localforage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCXSQcYiIK6ERzr1AFCUW2dSWru5Sv5ARw",
  authDomain: "diarko-fcm.firebaseapp.com",
  projectId: "diarko-fcm",
  storageBucket: "diarko-fcm.appspot.com",
  messagingSenderId: "137868198330",
  appId: "1:137868198330:web:1b8858086412b6c9271d83",
  measurementId: "G-9GGRYDDPP9"
}

const vapidKey = "BAIz69eVdYmIfUfqLvVubckGwL0Yzm1TfzTulRGu78gmOnePX5jANCR2I-upDno4Q0yq3Gxwd-AlMcjBfdbBGfU"

initializeApp(firebaseConfig);
const messaging = getMessaging()

const firebaseCloudMessaging = {
  init: async () => {
    
      try {
        const tokenInLocalForage = await localforage.getItem("fcm_token");

        // Return the token if it is already in our local storage
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }
        if (typeof window !== "undefined") {
        // Request the push notification permission from the browser
        const status = await Notification.requestPermission();

        if (status && status === "granted") {
          // Get a new token from Firebase
          const currentToken = await getToken(messaging, {
            vapidKey,
          });

          if (currentToken) {
            console.log(currentToken);
            localforage.setItem("fcm_token", currentToken);

            return currentToken;
          }
        }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    
  },
  getMessagingInstance: () => messaging
};

export const onMessageListener = async () => {
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload)
    })
  })
}

export { firebaseCloudMessaging };

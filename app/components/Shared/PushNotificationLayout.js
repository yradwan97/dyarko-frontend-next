'use client'
import React, { useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/messaging";
import { firebaseCloudMessaging, onMessageListener } from "../../lib/firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { onMessage } from "firebase/messaging";

function PushNotificationLayout({ children }) {
  const router = useRouter();

  onMessageListener().then((payload) => {
    console.log("payload", payload)
  }).catch((err) => console.log('failed: ', err))

  useEffect(() => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          console.log("token", token);
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url) => {
    if (url) {
      router.push(url);
    } else {return}
  };

  // Get the push notification message and triggers a toast to display it
  function getMessage() {
    const messaging = firebaseCloudMessaging.getMessagingInstance();
    
    if (messaging) {
        const unsubscribe = onMessage(messaging, (message) => {
          console.log(message)
          toast(
            <div className={message?.data?.url ? `cursor-pointer` : "cursor-default"} onClick={() => handleClickPushNotification(message?.data?.url)}>
              <h5>{message?.notification?.title}</h5>
              <h6>{message?.notification?.body}</h6>
            </div>,
            {
              closeOnClick: false,
            }
          );
        });
    
        return () => {
          // Unsubscribe the listener when the component unmounts
          unsubscribe();
        };
  }
}


  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}

export default PushNotificationLayout;
'use client'
import React, { useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/messaging";
// import { firebaseCloudMessaging, onMessageListener } from "../../lib/firebase/firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getMessaging, onMessage } from "firebase/messaging";
import useFcmToken from "@/app/utils/hooks/useFcmToken"
import firebaseApp from "@/app/utils/firebase/firebase";

function PushNotificationLayout({ children }) {
  const {fcmToken} = useFcmToken()
  const router = useRouter();

  useEffect(() => {
    setToken();

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        if (fcmToken) {
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [getMessage]);

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url) => {
    if (url) {
      router.push(url);
    } else {return}
  };

  // Get the push notification message and triggers a toast to display it
  function getMessage() {
    const messaging = getMessaging(firebaseApp)
    
    if (messaging) {
        const unsubscribe = onMessage(messaging, (message) => {
          
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
      {children}
    </>
  );
}

export default PushNotificationLayout;
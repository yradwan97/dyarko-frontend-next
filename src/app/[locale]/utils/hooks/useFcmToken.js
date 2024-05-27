import { useEffect, useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import firebaseApp from '../firebase/firebase';
import localforage from "localforage";


const useFcmToken = () => {
    const [token, setToken] = useState('');
    const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('');
    const vapidKey = "BAIz69eVdYmIfUfqLvVubckGwL0Yzm1TfzTulRGu78gmOnePX5jANCR2I-upDno4Q0yq3Gxwd-AlMcjBfdbBGfU"


  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
          const messaging = getMessaging(firebaseApp);

          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          // Check if permission is granted before retrieving the token
            if (permission === 'granted') {
                const tokenInLocalForage = await localforage.getItem("fcm_token")
                if (tokenInLocalForage !== null) {
                    setToken(tokenInLocalForage)
                    return
                } else {
                    const currentToken = await getToken(messaging, {
                    vapidKey: vapidKey
                    });
                    if (currentToken) {
                    setToken(currentToken);
                    return
                    } else {
                    
                    }
                }
            }
        }
      } catch (error) {
        console.error('An error occurred while retrieving token:', error);
      }
    };

    retrieveToken();
  }, []);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;
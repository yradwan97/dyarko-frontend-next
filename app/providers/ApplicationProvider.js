'use client'

import { SessionProvider } from "next-auth/react";
import {QueryProvider} from "./providers";
import {axiosClient as axios} from "../services/axiosClient"
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import useFcmToken from "../utils/hooks/useFcmToken";
import { LoadScript } from '@react-google-maps/api';
import Loader from "../components/Shared/Loader";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

const isExpired = (accessToken) => {
  const decodedAccessToken = jwtDecode(accessToken);
  return dayjs.unix(decodedAccessToken.exp).diff(dayjs()) < 1;
};

const ApplicationProvider = ({
  children,
}) => {
  const Application = () => {
    const {data: session, update} = useSession()
    const router = useRouter()
    const {fcmToken} = useFcmToken()

    const updateDeviceToken = async () => {
      await axios.put("/users/device_token", {device_token: fcmToken}, 
        {
          headers: {
            "auth-token": `Bearer ${session?.user?.accessToken}`
          }
        }
      )
    }

    useEffect(() => {
      if (session && fcmToken) {
        updateDeviceToken()
      }
    }, [fcmToken, session])

    useEffect(() => {
      const axiosInterceptor = axios.interceptors.request.use(
        async (config) => {
          const currentAccessToken = session?.user?.accessToken;
      
          if (session && currentAccessToken && !isExpired(currentAccessToken)) {
            // Case 1: Valid access token, not expired
            config.headers = {
              "auth-token": `Bearer ${currentAccessToken}`,
            };
            return config;
          }
      
          if (!session) {
            // Case 2: No session
            return config;
          }
      
          // Case 3: Access token is expired, refresh it
          const refreshToken = session?.user?.refreshToken;
      
          try {
            const response = await axios.post(`/refresh_token`, {
              refresh_token: refreshToken,
            });
      
            console.log("app provider", { session, refreshToken, response });
      
            config.headers["auth-token"] = `Bearer ${response.data.accessToken}`;
          } catch (error) {
            if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
              console.log("expired refresh token");
              // Handle the case where refresh token is expired or invalid
              // You might want to redirect the user to login or take appropriate action
              router.push("/login")
            } else {
              // Handle other errors
              console.error("Error refreshing token:", error);
            }
          }
      
          await update();
      
          return config;
        },
        (error) => {
          console.error(error)
        }
      );

      return () => {
        axios.interceptors.request.eject(axiosInterceptor)
      }
    }, [session, router, update])
    return (
      <LoadScript loadingElement={<Loader/>} googleMapsApiKey={googleMapsApiKey}>
        <QueryProvider>      
          {children}      
        </QueryProvider>
      </LoadScript>
    );
  };

  return <SessionProvider>
    <Application />
  </SessionProvider>
};

export default ApplicationProvider;

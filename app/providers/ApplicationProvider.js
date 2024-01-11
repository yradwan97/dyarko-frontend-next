'use client'

import { SessionProvider } from "next-auth/react";
import {QueryProvider} from "./providers";
import {axiosClient as axios} from "../services/axiosClient"
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

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
    }, [session])
    return (
    <QueryProvider>      
      {children}      
    </QueryProvider>
    );
  };

  return <SessionProvider>
    <Application />
  </SessionProvider>
};

export default ApplicationProvider;

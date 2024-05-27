'use client';

import { useSession } from "next-auth/react";
import { QueryProvider } from "./providers";
import { axiosClient as axios } from "../services/axiosClient";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import useFcmToken from "../utils/hooks/useFcmToken";
import { LoadScript } from '@react-google-maps/api';
import Loader from "../components/Shared/Loader";
import { useLocale } from "next-intl";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const userRoutes = [
  '/users',
  '/wallet',
  '/save_properties',
  '/tours',
  '/installments',
  '/rents',
  '/wallet/transactions',

]

const isExpired = (accessToken) => {
  const decodedAccessToken = jwtDecode(accessToken);
  return dayjs.unix(decodedAccessToken.exp).diff(dayjs()) < 1;
};

const ApplicationProvider = ({ children }) => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const { fcmToken } = useFcmToken();
  const [currentDeviceToken, setCurrentDeviceToken] = useState(session?.user?.device_token);
  const locale = useLocale();

  const updateDeviceToken = async () => {
    let res = await axios.put("/users/device_token", { device_token: fcmToken },
      {
        headers: {
          "auth-token": `Bearer ${session?.user?.accessToken}`
        }
      }
    );
    if (res.data.success) {
      setCurrentDeviceToken(res.data.data.device_token);
    }
  };

  useEffect(() => {
    if (session && fcmToken && fcmToken !== currentDeviceToken) {
      updateDeviceToken();
    }
  }, [fcmToken, session]);

  useEffect(() => {
    const axiosInterceptor = axios.interceptors.request.use(
      async (config) => {
        const currentAccessToken = session?.user?.accessToken;
        config.headers["Accept-Language"] = locale;
        if (session && currentAccessToken && !isExpired(currentAccessToken)) {
          config.headers['auth-token'] = `Bearer ${currentAccessToken}`;
          return config;
        }

        if (!session) {
          if (window.location.pathname === "/user") {
            return router.push("/login");
          }
          return config
        }

        const refreshToken = session?.user?.refreshToken;
        try {
          const response = await axios.post(`/refresh_token`, {
            refresh_token: refreshToken,
            role: session?.user?.role
          });

          config.headers["auth-token"] = `Bearer ${response.data.accessToken}`;
        } catch (error) {
          if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
            router.push("/login");
          } else {
            console.error("Error refreshing token:", error);
          }
        }

        await update();

        return config;
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(axiosInterceptor);
    };
  }, [session, router, update]);

  return (
    <LoadScript loadingElement={<Loader />} googleMapsApiKey={googleMapsApiKey}>
      <QueryProvider>
        {children}
      </QueryProvider>
    </LoadScript>
  );
};

export default ApplicationProvider;

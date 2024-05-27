'use client'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { PropsWithChildren, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import {verifyAuth} from "../services/api/auth"


export interface QueryProviderProps {}
const queryClient = new QueryClient()

export const QueryProvider = ({ children }: PropsWithChildren<QueryProviderProps>) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};



export interface AuthProviderProps {}

export const AuthProvider = ({ children }: PropsWithChildren<AuthProviderProps>) => {
  const {data: session, status} = useSession()
  useEffect(() => {
    if (status === "authenticated")
      verifyAuth()
  }, [status]);

  return (
    <>
      <SessionProvider>
        {children}
      </SessionProvider>
    </>
  );
};

export default AuthProvider;

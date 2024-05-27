"use client";

import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { ReactNode } from "react";

interface ClientProvidersProps {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

const ClientProviders: React.FC<ClientProvidersProps> = ({
  children,
  locale,
  messages,
}) => (
  <SessionProvider>
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
      <ToastContainer />
    </NextIntlClientProvider>
  </SessionProvider>
);

export default ClientProviders;

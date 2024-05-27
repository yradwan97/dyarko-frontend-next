'use client'
import React, { useState } from "react";
import PaymentDetails from "./PaymentDetails";
import Line from "@/src/app/[locale]/property-search/components/Line";
import PaymentSuccessfuly from "./PaymentSuccessfuly";
import Button from "@/src/app/[locale]/components/Shared/Button";
import { useTranslations } from "next-intl";

function PaymentMethod({onCheckOut, onChange}) {
  const t = useTranslations("Application.PaymentDetails")
  const [showMessge, setShowMessage] = useState(false);
  return (
    <>
      <PaymentDetails onChange={onChange} />
      <Button
        variant="primary"
        className={`mx-auto mt-14 block w-full`}
        onClick={onCheckOut}
      >
        {t("checkout")}
      </Button>
      <PaymentSuccessfuly visible={showMessge} setVisible={setShowMessage} />
    </>
  );
}

export default PaymentMethod;

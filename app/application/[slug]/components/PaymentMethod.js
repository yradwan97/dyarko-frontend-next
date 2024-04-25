'use client'
import React, { useState } from "react";
import PaymentDetails from "./PaymentDetails";
import Line from "@/app/property-search/components/Line";
import PaymentSuccessfuly from "./PaymentSuccessfuly";
import Button from "@/app/components/Shared/Button";

function PaymentMethod({onCheckOut, onChange}) {
  
  const [showMessge, setShowMessage] = useState(false);
  return (
    <>
      <PaymentDetails onChange={onChange} />
      <Button
        variant="primary"
        className={`mx-auto mt-14 block w-full`}
        onClick={onCheckOut}
      >
        Checkout
      </Button>
      <PaymentSuccessfuly visible={showMessge} setVisible={setShowMessage} />
    </>
  );
}

export default PaymentMethod;

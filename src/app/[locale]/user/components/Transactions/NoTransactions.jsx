import React from "react";
import transctionImg from "../../../../../../public/assets/transactions.png";
import Typography from "../../../components/Shared/Typography";
import Image from "next/image"

const NoTransaction = () => {
  return (
    <div className="pb-28">
      <Image
        src={transctionImg}
        className="mx-auto my-14 h-[306px] w-[306px]"
        alt="transaction"
        width={200}
        height={200}
      />
      <Typography variant="h4" as="h4" className="mb-4 text-center text-black">
        No Transactions yet
      </Typography>

    </div>
  );
}

export default NoTransaction;

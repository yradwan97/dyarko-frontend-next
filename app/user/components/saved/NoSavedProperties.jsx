import React from 'react'
import Image from "next/image"
import transactionImg from "../../../../public/assets/signup-art.jpg"
import Typography from "../../../components/Shared/Typography"

const NoSavedProperties = () => {
  return (
    <div className="pb-28">
      <Image
        src={transactionImg}
        className="mx-auto my-14 h-[306px] w-[306px]"
        alt="transaction"
        width={150}
        height={150}
      />
      <Typography variant="h4" as="h4" className="mb-3 text-center text-black">
        You have no saved
      </Typography>
      <Typography variant="h4" as="h4" className="mb-4 text-center text-black">
        real-estates
      </Typography>
    </div>
  )
}

export default NoSavedProperties
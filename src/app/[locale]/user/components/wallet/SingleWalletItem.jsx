import React from 'react'
import walletItem from "../../../../../../public/assets/wallet-item-new.png"
import Image from "next/image"
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';

const SingleWalletItem = ({ item }) => {
  const t = useTranslations("Account.Wallet")
  return (
    <div className="my-4 flex flex-row items-center justify-center">
      <div className="w-1/3 md:w-1/6 flex items-center justify-center ">
        <Image src={walletItem} height={500} width={500} alt='wallet-points-image' />
      </div>
      <div className="w-full md:w-3/4 py-10 lg:pl-4 ">
        <div className='flex flex-col lg:flex-row space-y-5 items-center justify-center'>
          <div className='space-y-5'>
            <h2 className='font-bold capitalize text-main-yellow-600'>{item.action.actionType}</h2>
            <p>{format(new Date(item.createdAt), "d/MM/yyyy")}</p>
          </div>
          <div className='lg:pl-36'>
            <h2 className='text-green'> +{item.points} {t("points")}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleWalletItem
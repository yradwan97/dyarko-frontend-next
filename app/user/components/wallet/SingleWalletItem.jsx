import React from 'react'
import walletItem from "../../../../public/assets/wallet-item.png"
import Image from "next/image"
import { capitalizeFirst } from '@/app/utils/utils'
import { format } from 'date-fns';


const SingleWalletItem = ({item}) => {
    
    let date = new Date(item.createdAt)
  return (
    
    <div className="my-2 flex">
      <div className="w-1/4 align-middle">
        <Image src={walletItem} className='pt-7 pl-7' height={100} width={100} alt='wallet-points-image' />
      </div>
      <div className="w-[75%] py-10 pl-4">
        <div className='flex flex-row'>
            <div>
                <h2 className='font-bold text-main-yellow-600'>{capitalizeFirst(item.action.actionType)}</h2>
                <p>{format(date, "d/MM/yyyy hh:mm a")}</p>
            </div>
            <div className='pl-36'>
                <h2 className='text-red'> +{item.points} points</h2>
            </div>
        </div>
        {/* <h2>Title</h2>
        <p>Description or other text content</p>
        <span>Numbers or additional information</span> */}
      </div>
    </div>
  )
}

export default SingleWalletItem
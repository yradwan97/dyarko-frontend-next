import React, { useState } from 'react'
import CalenderSolid from '@/app/components/UI/icons/CalenderSolid'
import MoneySolid from '@/app/components/UI/icons/MoneySolid'
import Typography from '@/app/components/Shared/Typography'

function Methods({methodType, setMethodType}) {

  const [method, setMethod] = useState(methodType)
  const handleClick = (type) => {
    setMethodType(type)
  }

  return (
    <div className='md:mt-10'>
        <Typography variant='body-sm-medium' as='h6' className="text-black mb-4 md:hidden">Choose your payment option</Typography>
        <div className='flex justify-between space-x-4 w-full'>
            <label 
                htmlFor='cash' 
                className={`${method === 'cash'? 'md:border-main-600 md:bg-main-100' : 'md:border-gray-200'} flex flex-1 items-center md:justify-between gap-x-3 md:border py-4 md:px-7 rounded-lg`}
                onClick={()=>handleClick("cash")}>
                <div className='md:flex items-center md:space-x-3 order-2 md:order-1'>
                    <span className={`hidden ${method === 'cash'? 'bg-main-200' : 'bg-gray-100'} w-10 h-10 rounded-full md:flex justify-center items-center`}>
                        <MoneySolid className={`${method === 'cash'? 'fill-main-600': 'fill-gray-300'} w-5 h-5 `}/>
                    </span>
                    <Typography variant='body-md-medium' as='span' className="text-black capitalize">Cash</Typography>
                </div>
                <input 
                type="radio" 
                id="cash" 
                name="cash" 
                value="cash"
                className="accent-[#0096db] w-5 h-5 order-1 md:order-2"
                checked={method === 'cash'}
                onChange={(e)=>setMethod(e.target.value)}
                />
            </label>   
            <label 
                htmlFor='installment' 
                className={`${method === 'installment'? 'md:border-main-600 md:bg-main-100' : 'border-gray-200'} flex flex-1 items-center md:justify-between gap-x-3 md:border py-4 md:px-7 rounded-lg`}
                onClick={()=>handleClick("installment")}
                >
                <div className='md:flex items-center md:space-x-3 order-2 md:order-1'>
                    <span className={`hidden ${method === 'installment'? 'bg-main-200' : 'bg-gray-100'} w-10 h-10 rounded-full md:flex justify-center items-center`}>
                        <CalenderSolid className={`${method === 'installment'? 'fill-main-600': 'fill-gray-300'} w-5 h-5 `}/>
                    </span>
                    <Typography variant='body-sm-medium' as='span' className="text-black capitalize">Installment Payment</Typography>
                </div>
                <input 
                    type="radio" 
                    id="installment" 
                    name="installment" 
                    value="installment"
                    className='accent-[#0096db] w-5 h-5 order-1 md:order-2'
                    checked={method === 'installment'}
                    onChange={(e)=>setMethod(e.target.value)}
                    />
            </label>
        </div>
    </div>
    
  )
}

export default Methods
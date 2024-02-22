import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from "../../../components/Shared/Button"
import Typography from "../../../components/Shared/Button"
import Input from "../../../components/Shared/Form/Input"
import Select from "../../../components/Shared/Form/Select"

const values=[
  {id:1, icon:"1 year - $1200/Month"},
  {id:2, icon:"2 year - $1200/Month"},
  {id:3, icon:"3 year - $1200/Month"},
  {id:4, icon:"4 year - $1200/Month"},
  {id:5, icon:"5 year - $1200/Month"},

]

function InstallmentDetails() {
  const {register} = useForm()

  return (
    <div className='mt-8 p-6 border border-gray-200 rounded-lg'>
        {/* <Typography variant='body-lg-bold' as="h4" className="text-black mb-4">Write the down-payment amount</Typography> */}
        <Typography variant='body-sm-medium' as="p" className="text-black mb-4">Down Payment Amount</Typography>
        <div className='relative mb-4'>
            <Input 
               id="payment-amount" 
               register={{register: {...register("payment-amount")}}} 
               placeholder="e.g. 120.000"
               className="!pl-16"
               />
            <span className='absolute top-0 left-0 bottom-0 px-4 flex justify-center items-center border-r border-gray-200 text-main-secondary'>$</span>
        </div>
        {/* <Typography variant='body-lg-bold' as="h4" className="text-black mb-4">Please select your prefered installment plan</Typography> */}
        <Typography variant='body-sm-medium' as="p" className="text-black mb-4">Select Prefered Installment Plan</Typography>
        <Select values={values} containerClass="py-3 px-5 w-full rounded-lg !justify-between"/>
        
    </div>
  )
}

export default InstallmentDetails
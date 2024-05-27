import { PlusIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { useForm } from 'react-hook-form'
import Line from '@/src/app/[locale]/property-search/components/Line'
import Overlay from '@/src/app/[locale]/property-details/components/Overlay'
import Button from '@/src/app/[locale]/components/Shared/Button'
import Typography from '@/src/app/[locale]/components/Shared/Typography'
import Input from '@/src/app/[locale]/components/Shared/Form/Input'
import Label from '@/src/app/[locale]/components/Shared/Form/Label'
import CloseOutline from '@/src/app/[locale]/components/UI/icons/CloseOutline'
import CardSolid from "@/src/app/[locale]/components/UI/icons/CardSolid"

function AddCard(props) {
    const {register} = useForm()
  return (
    <Overlay visible={props.visible} setVisible={props.setVisible}>
    <div className='relative w-full sm:w-[413px] mx-auto bg-white rounded-lg'>
        <div className='p-6 flex items-center'>
            <div className='relative flex justify-center items-center w-6 h-6 mr-[14px] rounded-full bg-main-600'>
                <CardSolid className='w-3 h-3 fill-white'/>
                <span className='absolute top-[76%] -right-[2px] w-2.5 h-2.5 text-sm rounded-full flex justify-center items-center bg-main-yellow-600 text-white'>
                    <PlusIcon className='text-white text-sm'/>
                </span>
            </div>
            <Typography variant='body-md-medium' as='p' className="text-black mr-auto">Add a new card</Typography>
            <CloseOutline className='w-4 h-4 stroke-main-secondary ml-auto'/>
        </div>
        <Line/>
        <form className='py-8 px-6 text-left space-y-4'>
            <div>
                <Label htmlFor='cardNumber' className="!mb-2">Card Number</Label>
                <Input 
                    id="cardNumber" 
                    register={{register: {...register("cardNumber")}}} 
                    placeholder="e.g. 2746 2352 4675 5673"
                    className=""
                    />
            </div>
            <div>
                <Label htmlFor='expiryDate' className="mb-2">Expiry Date</Label>
                <Input 
                    id="expiryDate" 
                    register={{register: {...register("expiryDate")}}} 
                    placeholder="MM/YY"
                    className=""
                    />
            </div>
            <div>
                <Label htmlFor='cvv' className="mb-2">CVV</Label>
                <Input 
                    id="cvv" 
                    register={{register: {...register("cvv")}}} 
                    placeholder="e.g. 823"
                    className=""
                    />
            </div>
            <div className="flex items-start space-x-2 !mt-6">
                <input id="default-checkbox" type="checkbox" value="" className="w-5 min-w-[24px] h-5 text-black bg-gray-100 rounded-lg border border-[#D6DDEB] outline-none focus:outline-none"/>
                <label  className="ml-2 text-sm font-medium !text-black">
                    Save this card for future use
                </label>
            </div>
            <Button variant='primary' className="w-full !mt-6">Add</Button>
        </form>
    </div>
    </Overlay>
  )
}

export default AddCard
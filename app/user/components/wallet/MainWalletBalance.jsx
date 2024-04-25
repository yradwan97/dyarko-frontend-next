import React from 'react'
import Button from "../../../components/Shared/Button"
import { axiosClient as axios } from "../../../services/axiosClient"
import { toast } from 'react-toastify'
import { prettifyError } from '@/app/utils/utils'

const MainWalletBalance = ({ user }) => {

  const handleCollectPrizes = async () => {

    try {
      const res = await axios.post("/prizes_requests")
      if (res.data.success) {
        toast.success("Prizes request sent successfully.")
      }
    } catch (e) {
      console.error(e)
      let msg = e?.response?.data?.errors[0]?.msg
      toast.error(msg ? prettifyError(msg) : "Unable to collect prizes, try again later.")
    }
  }

  return (
    <>
      <div className="w-full lg:w-1/2 bg-walletBase justify-center rounded-md flex p-10">
        <div className='flex flex-col justify-center text-center'>
          <p className='font-bold'>Your points</p>
          <h4 className='mt-2 text-white'>{user?.points} points</h4>
        </div>
      </div>
      {user?.points > 0 && <div className="flex justify-center items-center mt-2">
        <Button variant="primary" onClick={handleCollectPrizes}>Collect Prizes</Button>
      </div>}
    </>
  )
}

export default MainWalletBalance
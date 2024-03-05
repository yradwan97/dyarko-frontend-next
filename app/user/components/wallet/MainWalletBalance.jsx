import React from 'react'
import Button from "../../../components/Shared/Button"
import { axiosClient as axios } from "../../../services/axiosClient"

const MainWalletBalance = ({ user }) => {

  const handleCollectPrizes = async () => {

    try {
      const res = await axios.post("/prizes_requests")
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className="w-full lg:w-1/2 bg-walletBase justify-center rounded-md flex p-10">
        <div className='flex flex-col justify-center text-center'>
          <p>Your balance</p>
          <h6 className='font-bold text-white mb-1'>KWD {user?.point_balance}</h6>
          <hr />
          <h4 className='mt-1'>{user?.points} points</h4>
        </div>
      </div>
      {user?.points > 0 && <div className="flex justify-center items-center mt-2">
        <Button variant="primary" onClick={handleCollectPrizes}>Collect Prizes</Button>
      </div>}
    </>
  )
}

export default MainWalletBalance
import React from 'react'

const MainWalletBalance = ({user}) => {
  return (
    <div className="w-[50%] bg-walletBase justify-center rounded-md flex p-10">
        <div className='flex flex-col justify-center text-center'>
            <p>Your balance</p>
            <h6 className='font-bold text-white mb-1'>${user.balance}</h6>
            <hr />
            <h4 className='mt-1'>{user.points} points</h4>
      </div>
    </div>
  )
}

export default MainWalletBalance
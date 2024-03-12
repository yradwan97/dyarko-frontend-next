import React from 'react'
import Typography from "@/app/components/Shared/Typography"
import VerifiedCheck from "../components/UI/icons/VerifiedCheck"

const ConfirmPageContents = () => {
    return (
        <div className='flex flex-col border items-center h-96 justify-center rounded-lg space-y-4 mt-3 border-gray-300 px-8 pb-8 pt-2'>
            <VerifiedCheck />
            <Typography className='text-center' as='h2' variant='h2'>
                Your email has been verified successfully!
            </Typography>
            <Typography className='text-center' as="p" variant='body-md-medium'>
                Close this tab and proceed to login with your credentials.
            </Typography>
        </div>
    )
}

export default ConfirmPageContents
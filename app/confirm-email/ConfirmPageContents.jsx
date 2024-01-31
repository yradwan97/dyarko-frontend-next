import React from 'react'
import Typography from "@/app/components/Shared/Typography"
import Button from '../components/Shared/Button'
const ConfirmPageContents = () => {
    return (
        <div className='flex flex-col border items-center h-96 justify-center rounded-lg space-y-4 mt-5 border-gray-300 p-8'>
            <Typography as='h2' variant='h2'>
                Your email has been verified successfully!
            </Typography>
            <Typography as="p" variant='body-md-medium'>
                Close this tab and proceed to login with your credentials.
            </Typography>
        </div>
    )
}

export default ConfirmPageContents
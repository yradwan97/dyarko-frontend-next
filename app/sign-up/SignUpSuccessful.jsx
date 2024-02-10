import React from 'react'

import Overlay from '@/app/property-details/components/Overlay'
import Button from '@/app/components/Shared/Button'
import Typography from '@/app/components/Shared/Typography'
import { useRouter } from 'next/navigation'

function SignUpSuccessful(props) {
    const router = useRouter()
    return (
        <Overlay visible={props.visible} setVisible={props.setVisible}>
            <div className='relative w-full md:w-[500px] lg:w-[824px] mx-auto bg-white rounded-lg m-6 py-10 md:py-20 px-4 flex flex-col justify-center items-center'>
                <div className='w-8/12 sm:w-1/2 lg:w-4/12 h-[160px] rounded-lg flex justify-center items-center'>
                    <Typography variant='h2' as='h2' className="text-main-blue text-center">Sign Up Successful</Typography>
                </div>
                <Typography variant='h3' as='h3' className="text-black my-6 text-center">Your account was registered successfully.</Typography>
                <Typography variant='body-md-medium' as='p' className="text-gray-500 md:w-8/12 lg:w-[35%] text-center">Please check your email and verify your account!</Typography>
                <Button variant='primary' className="w-full sm:w-1/2 md:w-4/12 mt-12" onClick={() => {
                    router.push("/login")
                }}>Okay</Button>
            </div>
        </Overlay>
    )
}

export default SignUpSuccessful
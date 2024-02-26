'use client'
import Typography from "../components/Shared/Typography"
import { axiosClient as axios } from "../services/axiosClient"
import React, { useEffect, useState } from 'react'

const PrivacyPolicyContent = () => {
    const [userPrivacy, setUserPrivacy] = useState("")

    useEffect(() => {
        const getPrivacyPolicy = async () => {
            const res = await axios.get("/settings/privacy_policy")
            const userPriv = res.data.data.find(d => d.type === "user")
            console.log(userPriv.content)
            if (userPriv) {
                setUserPrivacy(userPriv.content)
            }
        }
        getPrivacyPolicy()
    }, [])

    return (
        <div className='container py-20'>

            <div className='md:px-14'>
                <div className='flex flex-col md:flex-row md:justify-between gap-6'>
                    <Typography variant='h3' as='h3' className="text-black">Privacy Policy</Typography>
                    {userPrivacy !== "" && <div className='w-full md:w-6/12 lg:w-5/12 space-y-8'>
                        <Typography variant='body-md-medium' as='p' className="text-gray-500">
                            {userPrivacy}
                        </Typography>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicyContent
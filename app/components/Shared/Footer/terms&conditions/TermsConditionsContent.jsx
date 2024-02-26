'use client'
import React, { useEffect, useState } from 'react'
import Typography from '../../Typography'
import { axiosClient as axios } from '@/app/services/axiosClient'

const TermsConditionsContent = () => {

  const [parts, setParts] = useState([])

  useEffect(() => {
    const getTermsAndConditions = async () => {
      const res = await axios.get("/settings/terms_conditions")
      let userTerms = res.data.data.find(d => d.type === "user")
      if (userTerms) {
        setParts(userTerms.content.split("\r\n\r\n"))
      }
    }
    getTermsAndConditions()
  }, [])

  return (
    <div className='container py-20'>
      <Typography variant='h2' as='h2' className="text-black mb-12">Terms & Conditions</Typography>
      <div className='md:px-14'>
        {parts.length > 0 && <div className='flex flex-col md:flex-row md:justify-between gap-6'>
          <Typography variant='h3' as='h3' className="text-black">Terms</Typography>
          <div className='w-full md:w-6/12 lg:w-5/12 space-y-8'>
            {parts?.map((part, index) => (
              <Typography key={index} variant='body-md-medium' as='p' className="text-gray-500">
                {part}
              </Typography>
            ))}
          </div>
        </div>}
      </div>
    </div>
  )
}

export default TermsConditionsContent
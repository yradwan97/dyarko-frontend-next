import React from 'react'
import Typography from '../../Typography'

const TermsConditionsContent = () => {
  return (
    <div className='container py-20'>
      <Typography variant='h2' as='h2' className="text-black mb-12">Terms & Conditions</Typography>
      <div className='md:px-14'>
        <div className='flex flex-col md:flex-row md:justify-between gap-6'>
          <Typography variant='h3' as='h3' className="text-black">Terms</Typography>
          <div className='w-full md:w-6/12 lg:w-5/12 space-y-8'>
            <Typography variant='body-md-medium' as='p' className="text-gray-500">
              A terms and conditions agreement outlines the website administrator’s rules regarding user behavior, and provides information about the actions the website administrator can and will perform.
            </Typography>
            <Typography variant='body-md-medium' as='p' className="text-gray-500">
              Your terms and conditions text is a contract between your website and its users. In the event of a legal dispute, arbitrators will look to this agreement to determine whether each party acted within their rights
            </Typography>

          </div>
        </div>
        <div className='flex flex-col md:flex-row md:justify-between gap-6 mt-32'>
          <Typography variant='h3' as='h3' className="text-black">User License</Typography>
          <div className='w-full md:w-6/12 lg:w-5/12 space-y-8'>
            <Typography variant='body-md-medium' as='p' className="text-gray-500">
              A terms and conditions agreement outlines the website administrator’s rules regarding user behavior, and provides information about the actions the website administrator can and will perform.
            </Typography>
            <Typography variant='body-md-medium' as='p' className="text-gray-500">
              Your terms and conditions text is a contract between your website and its users. In the event of a legal dispute, arbitrators will look to this agreement to determine whether each party acted within their rights
            </Typography>

          </div>
        </div>
        <div className='flex flex-col md:flex-row md:justify-between gap-6 mt-32'>
          <Typography variant='h3' as='h3' className="text-black">Our Privacy Policy</Typography>
          <div className='w-full md:w-6/12 lg:w-5/12 space-y-8'>
            <Typography variant='body-md-medium' as='p' className="text-gray-500">
              A terms and conditions agreement outlines the website administrator’s rules regarding user behavior, and provides information about the actions the website administrator can and will perform.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsConditionsContent
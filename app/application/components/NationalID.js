import React from 'react'
import Button from '@/app/components/Shared/Button'
import Typography from '@/app/components/Shared/Typography'
import FileOutline from "@/app/components/UI/icons/FileOutline"

function NationalID() {
  return (
    <>
        <Typography variant='h5' as="h5" className="text-black mb-6">ID (Photo Identification)</Typography>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
            <Typography variant='body-sm-bold' as="h5" className="text-black mb-2 md:mb-0">National ID <span className='text-main-600'>(front)</span></Typography>
            <Button
                type="button" variant="primary-outline"
                className="group relative  flex justify-center items-center space-x-2 w-full md:w-5/12"
                >
                <FileOutline className='w-4 h-4 stroke-main-600 group-hover:stroke-white'/>
                <Typography variant='body-md-bold' as='span' className="text-main-600 group-hover:text-white">Select File</Typography>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer"/>
            </Button>
        </div>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center mt-4'>
            <Typography variant='body-sm-bold' as="h5" className="text-black mb-2 md:mb-0">National ID <span className='text-main-600'>(back)</span></Typography>
            <Button
            type="button" variant="primary-outline"
            className="group relative  flex justify-center items-center space-x-2 w-full md:w-5/12"
            >
            <FileOutline className='w-4 h-4 stroke-main-600 group-hover:stroke-white'/>
            <Typography variant='body-md-bold' as='span' className="text-main-600 group-hover:text-white">Select File</Typography>
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer"/>
            </Button>
        </div>
    </>
  )
}

export default NationalID
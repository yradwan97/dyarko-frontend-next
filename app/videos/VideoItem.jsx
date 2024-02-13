import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import Typography from '../components/Shared/Typography'

const VideoItem = ({ className, videoData }) => {
  return (
    <Link href={`/videos/${videoData._id}`}>
      <div className={`rounded-lg bg-white p-3 ${className || ""}`}>
        <div className="relative h-[310px] w-full">
          <Image src={videoData.thumbnail}
            className="h-full w-full"
            width={200}
            height={200}
            alt="" />
          {/* <PlayVideoSolid className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer stroke-black stroke-2 fill-white" /> */}
        </div>
        <Typography variant="h4" as="h4" className='capitalize'>
          {videoData.title}
        </Typography>
      </div>
    </Link>
  )
}

export default VideoItem
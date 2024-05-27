import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import Typography from '../components/Shared/Typography'
import HeartOutline from "../components/UI/icons/HeartOutline";
import EyeOutline from "../components/UI/icons/EyeOutline";
import ChatOutline from "../components/UI/icons/ChatOutline";

const VideoItem = ({ className, videoData }) => {

  return (
    <Link href={`/videos/${videoData._id}`}>
      <div className='flex flex-col'>
        <div className={`rounded-lg p-3 ${className || ""}`}>
          <Typography variant="h4" as="h4" className='p-1 text-center mb-2 capitalize'>
            {videoData.title}
          </Typography>
          <div className="relative h-[310px] w-full">
            <Image src={videoData.thumbnail}
              className="h-full w-full rounded-lg"
              width={200}
              height={200}
              alt=""
            />
          </div>
          <div className='flex flex-row justify-between mt-3 rounded-lg p-3 border border-main-400 cursor-default bg-white'>
            <div className='flex flex-row space-x-2 items-center'>
              <EyeOutline className="stroke-gray-400" />
              <span>{videoData?.views}</span>
            </div>
            <div className='flex flex-row space-x-2 items-center'>
              <HeartOutline className='stroke-gray-400 w-5 h-5' />
              <span>{videoData.like.count}</span>
            </div>
            <div className='flex flex-row space-x-2 items-center'>
              <ChatOutline className='stroke-gray-400' />
              <span>{videoData.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default VideoItem
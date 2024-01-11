import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import PlayVideoSolid from "../components/UI/icons/PlayVideoSolid"
import Typography from '../components/Shared/Typography'

const VideoItem = ({className, videoData}) => {
  return (
    <div className={`rounded-lg bg-white p-3 ${className || ""}`}>
        <div className="relative h-[310px] w-full">
            <Image src={videoData.thumbnail || defaultThumbnail}
                    className="h-full w-full"
                    width={200}
                    height={200}
                    alt="" />   
            <Link href={`/videos/${videoData._id}`}>
                <PlayVideoSolid className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer fill-black/70" />
            </Link>
        </div>
        <Typography variant="h4" as="h4">
            <Link href={`/videos/${videoData._id}`}>{videoData.title}</Link>
        </Typography>
    </div>
  )
}

export default VideoItem
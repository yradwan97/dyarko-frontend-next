'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { redirect, useParams } from 'next/navigation'
import PlayVideoSolid from '@/app/components/UI/icons/PlayVideoSolid'
import Button from '@/app/components/Shared/Button'
import Typography from '@/app/components/Shared/Typography'
import SendSolid from "@/app/components/UI/icons/SendSolid"
import VideoUser from './VideoUser'
import Comment from './Comment'
import VideoItem from '../../VideoItem'
import { addComment, useGetVideo, useGetVideos } from '../../videoService'
import Loader from '@/app/components/Shared/Loader'
import { useSession } from 'next-auth/react'
import Link from "next/link"

const VideoDetailsContent = () => {
  const { slug } = useParams()
  const { videos,
    isLoading,
    isFetching,
    isRefetching
  } = useGetVideos(1, "size=3&sort=createdAt")

  const { data: session } = useSession()

  const { video: currentVideo,
    refetch: refetchSingleVideo,
    isLoading: isSingleVideoLoading,
    isCommentsLoading,
    refetchComments,
    comments
  } = useGetVideo(slug)

  const [comment, setComment] = useState("")

  const onTriggerRefetch = () => {
    refetchComments()
    refetchSingleVideo()
  }

  useEffect(() => {
    refetchSingleVideo()
  }, [slug])
  if (isLoading || isFetching || isRefetching || isSingleVideoLoading) return <Loader />


  return (
    <div className="container py-20">
      {currentVideo && (
        <div className="flex flex-col md:flex-row">
          <div className="relative h-[300px] w-full bg-cover bg-center md:h-auto md:w-1/2">
            <div className="relative h-full">
              <Image src={currentVideo.thumbnail} alt="" height={450} width={450} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/4 -translate-y-1/4">
                <Link href={currentVideo.video_name} legacyBehavior passHref>
                  <a href={currentVideo.video_name} target="_blank" rel="noopener noreferrer">
                    <PlayVideoSolid className="h-16 w-16 cursor-pointer fill-black/40 z-999" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col overflow-hidden rounded-lg border border-main-200 md:w-1/2">
            <div className="bg-main-100 p-10">
              <VideoUser videoData={currentVideo} onTriggerRefetch={onTriggerRefetch} />
            </div>
            <div>
              <div className="p-5">
                {comments?.length > 0 ? comments?.map((comment, index) => {
                  return <Comment key={index} comment={comment}>Child</Comment>
                }) : (
                  <p>No comments</p>
                )}
              </div>
              <div className="flex space-x-4 bg-main-100 py-3 px-6">
                <input
                  placeholder="Leave a comment"
                  onChange={e => setComment(e.currentTarget.value)}
                  value={comment}
                  className="btn grow rounded-2xl border border-gray-200 px-2 py-2 text-sm font-medium tracking-tight placeholder-gray-400 transition-all duration-500 md:px-5"
                />
                <Button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-main-600"
                  onClick={async () => {
                    if (session?.user?.accessToken) {
                      await addComment(comment, slug, session?.user?.accessToken)
                      refetchComments()
                      refetchSingleVideo()
                      setComment("")
                    } else {
                      redirect("/login")
                    }
                  }}>
                  <SendSolid className="fill-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <Typography
          variant="h2"
          as="h2"
          className="my-12 text-2xl font-bold leading-[44px] text-black sm:text-4xl sm:leading-[56px]"
        >
          Related videos
        </Typography>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
          {videos?.length > 0 && videos?.filter(video => video._id !== slug).map((video, index) => (
            <VideoItem
              key={index}
              className="!bg-main-100 !p-3"
              videoData={video}
            />
          ))}
        </div>
      </div>
    </div>

  )
}

export default VideoDetailsContent
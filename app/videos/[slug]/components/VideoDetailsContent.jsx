'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import PlayVideoSolid from '@/app/components/UI/icons/PlayVideoSolid';
import Button from '@/app/components/Shared/Button';
import Typography from '@/app/components/Shared/Typography';
import LinkIcon from "@/app/components/UI/icons/LinkIcon";
import SendSolid from "@/app/components/UI/icons/SendSolid";
import VideoUser from './VideoUser';
import Comment from './Comment';
import VideoItem from '../../VideoItem';
import { addComment, useGetVideo, useGetVideoComments } from '../../videoService';
import { useSession } from 'next-auth/react';
import Link from "next/link";
import { useGetOwnerVideos } from '@/app/companies/ownersApi';
import { toast } from "react-toastify"

const VideoDetailsContent = () => {
  const { slug } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [comment, setComment] = useState("");

  const {
    video: currentVideo,
    refetch: refetchSingleVideo,
  } = useGetVideo(slug);

  const { data: videos } = useGetOwnerVideos(currentVideo?.user);

  const {
    comments,
    refetch: refetchComments
  } = useGetVideoComments(slug, session?.user?.accessToken);

  const relatedVideos = videos?.filter(video => video._id !== slug) || [];

  const onTriggerRefetch = () => {
    refetchComments();
    refetchSingleVideo();
  };

  useEffect(() => {
    refetchSingleVideo();
  }, [slug, refetchSingleVideo]);

  const handleShareClicked = (e) => {
    console.log(e)
    e.preventDefault()

    const textToCopy = window?.location.href
    console.log(textToCopy)
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('URL copied to clipboard successfully:', textToCopy);
        toast.success("Video link copied to clipboard")
      })
      .catch(err => {
        console.error('Could not copy URL: ', err);
        toast.error('Could not copy URL. Please try again.');
      });
  }

  const handleCommentSubmit = async () => {
    if (!session?.user?.accessToken) {
      router.push("/login");
      return;
    }
    await addComment(comment, slug);
    refetchComments();
    refetchSingleVideo();
    setComment("");
  };

  return (
    <div className="container py-20">
      {currentVideo && (
        <>
          <div className='flex flex-col sm:flex-row sm:justify-between my-2'>
            <Typography as='h2' variant='h2' className='mb-3'>
              {currentVideo?.title}
            </Typography>
            <Button
              variant="primary-outline"
              onClick={handleShareClicked}
              className="flex flex-1 items-center justify-center stroke-main-600 leading-6 hover:stroke-white sm:flex-none sm:justify-start"
            >
              <LinkIcon className="stroke-inherit mr-1 h-4 w-4" />
              <span className="">Share Video</span>
            </Button>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="relative h-auto w-full bg-cover bg-center md:w-1/2">
              <Link href={currentVideo.video_name} legacyBehavior passHref>
                <a href={currentVideo.video_name} target="_blank" rel="noopener noreferrer">
                  <div className="relative">
                    <Image src={currentVideo.thumbnail} alt="" height={700} width={700} />
                    <div className="absolute -translate-x-7 inset-0 flex justify-center items-center">
                      <PlayVideoSolid className="h-16 w-16 relative cursor-pointer stroke-white stroke-2 fill-black z-999" />
                    </div>
                  </div>
                </a>
              </Link>
            </div>
            <div className="flex w-full flex-col overflow-hidden rounded-lg border border-main-200 md:w-1/2">
              <div className="bg-main-100 p-10">
                <VideoUser videoData={currentVideo} onTriggerRefetch={onTriggerRefetch} />
              </div>
              <div>
                <div className="p-5">
                  {comments?.length > 0 ? comments?.map((comment, index) => (
                    <Comment key={index} comment={comment} />
                  )) : (
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
                    onClick={handleCommentSubmit}>
                    <SendSolid className="fill-white" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div>
        {relatedVideos.length > 0 &&
          <>
            <Typography
              variant="h2"
              as="h2"
              className="my-12 text-2xl font-bold leading-[44px] text-black sm:text-4xl sm:leading-[56px]"
            >
              Related videos
            </Typography>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
              {relatedVideos.map((video, index) => (
                <VideoItem
                  key={index}
                  className="!bg-main-100 !p-3"
                  videoData={video}
                />
              ))}
            </div>
          </>
        }
      </div>
    </div >
  );
};

export default VideoDetailsContent;

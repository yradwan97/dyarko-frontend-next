'use client'
import React from "react";
import "swiper/css";
import Typography from "../../components/Shared/Typography";
import Link from "next/link";
import { useGetVideos } from "@/app/videos/videoService";
import VideoItem from "@/app/videos/VideoItem";

function RelatedVideos() {
  const { videos } = useGetVideos(1, "size=3")
  return (
    <div className="bg-main-100  py-20 ">
      <div className="container">
        <div className="mb-7 flex items-center justify-between">
          <Typography
            variant="h2"
            as="h2"
            className="text-2xl font-bold leading-[44px] text-black sm:text-4xl sm:leading-[56px]"
          >
            Related videos
          </Typography>
          <Link href="/videos" className="text-xl font-bold text-main-600">
            View All
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
          {videos?.map((video, index) => (
            <VideoItem
              key={index}
              className="!bg-main-100 !p-3"
              videoData={video}
            />
          ))}
        </div>

      </div>
      <div className="lg:pl-36">


      </div>
    </div>
  );
}

export default RelatedVideos;

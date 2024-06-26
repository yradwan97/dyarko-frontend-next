'use client'
import React from "react";
import "swiper/css";
import Typography from "../../components/Shared/Typography";
import Link from "next/link";
import { useGetVideos } from "@/src/app/[locale]/videos/videoService";
import VideoItem from "@/src/app/[locale]/videos/VideoItem";
import { useTranslations } from "next-intl";

function RelatedVideos() {
  const { videos } = useGetVideos(1, "size=3", true)
  const t = useTranslations("HomePage.Videos")
  return (
    <div className="bg-main-100 py-20">
      <div className="container">
        <div className="mb-7 flex items-center justify-between">
          <Typography
            variant="h2"
            as="h2"
            className="md:text-4xl font-bold leading-[44px] text-black text-2xl sm:leading-[56px]"
          >
            {t("title")}
          </Typography>
          <Link href="/videos" className="text-xl font-bold text-main-600">
            {t("view-all")}
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
          {videos?.map((video, index) => (
            <VideoItem
              key={index}
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

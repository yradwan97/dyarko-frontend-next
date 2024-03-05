"use client";
import React, { use, useEffect, useState } from "react";
import PropTypes from "prop-types";
import HeartOutline from "../../../components/UI/icons/HeartOutline";
import ChatOutline from "../../../components/UI/icons/ChatOutline";
import Typography from "@/app/components/Shared/Typography";
import Avatar from "@/app/components/Shared/Avatar";
import { Video } from "../../../types/types";
import { likeVideo } from "../../videoService";
import { useSession } from "next-auth/react";
import HeartSolid from "@/app/components/UI/icons/HeartSolid";
import Link from "next/link";

type VideoUserProps = {
  videoData: Video;
  onTriggerRefetch: () => void;
};

const VideoUser = ({ videoData, onTriggerRefetch }: VideoUserProps) => {
  const [liked, setLiked] = useState(videoData.like.status);
  const [likes, setLikes] = useState(videoData.like.count);

  useEffect(() => {
    if (videoData) {
      setLiked(videoData.like.status);
      setLikes(videoData.like.count);
    }
  }, [videoData]);

  const likeVideoHandler = async () => {
    let res = await likeVideo(videoData._id, liked);
    if (res!.status === 200) {
      onTriggerRefetch();
    }
  };

  return (
    <>
      <div className="mt-5 flex w-full items-center">
        <div className="relative flex items-center justify-center rounded-full bg-main-yellow-600">
          <Link href={`/company-details/${videoData?.user?._id}`}>
            <Avatar
              userName={videoData?.user?.name}
              userImg={videoData?.user?.image}
            />
          </Link>
        </div>
        <Typography variant="h5" as="h5" className="ml-2 text-lg font-bold">
          {videoData?.user?.name}
        </Typography>
      </div>
      <div className="mt-7 mb-3 flex w-full items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={likeVideoHandler}
            className="flex flex-col items-center space-y-2"
          >
            {liked ? (
              <HeartSolid className="fill-red stroke-red w-4 h-4" />
            ) : (
              <HeartOutline className="h-5 w-5 stroke-black" />
            )}
            <Typography variant="body-xs-bold" as="span" className="text-black">
              {likes || 0}
            </Typography>
          </button>
          <div className="flex flex-col items-center space-y-2">
            <ChatOutline className="h-5 w-5 stroke-black" />
            <Typography variant="body-xs-bold" as="span" className="text-black">
              {videoData.comments || 0}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

VideoUser.propTypes = {
  videoData: PropTypes.object.isRequired,
};

export default VideoUser;

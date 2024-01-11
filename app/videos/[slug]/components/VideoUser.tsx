'use client'
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import HeartOutline from "../../../components/UI/icons/HeartOutline";
import ChatOutline from "../../../components/UI/icons/ChatOutline"
import Typography from "@/app/components/Shared/Typography";
import Avatar from "@/app/components/Shared/Avatar"
import { Video } from "../../../types/types";
import { likeVideo } from "../../videoService";
import { useSession } from "next-auth/react";

type VideoUserProps = {
  videoData: Video;
};

const VideoUser = (props: VideoUserProps) => {
  const { videoData } = props;
  const {data: session} = useSession()
  
  const likeVideoHandler = async () => {
    // @ts-ignore
    if (session?.user?.accessToken) {
      // @ts-ignore
      await likeVideo(videoData._id, session?.user?.accessToken)
    }
  };


  return (
    <>
      <div className="mt-5 flex w-full items-center">
        <div className="relative flex items-center justify-center rounded-full bg-main-yellow-600">
          <Avatar userName={videoData?.user?.name} link="" />
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
            <HeartOutline className="h-5 w-5 stroke-black" />
            <Typography variant="body-xs-bold" as="span" className="text-black">
              {videoData?.like?.length || 0}
            </Typography>
          </button>
          <div className="flex flex-col items-center space-y-2">
            <ChatOutline className="h-5 w-5 stroke-black" />
            <Typography variant="body-xs-bold" as="span" className="text-black">
              {videoData.comments || 0}
            </Typography>
          </div>
        </div>
        {/*<Button*/}
        {/*  variant="primary"*/}
        {/*  className="!rounded-[4px] !py-[7px] !px-4 text-xs font-bold "*/}
        {/*>*/}
        {/*  Follow*/}
        {/*</Button>*/}
      </div>
    </>
  );
};

VideoUser.propTypes = {
  videoData: PropTypes.object.isRequired,
};

export default VideoUser;

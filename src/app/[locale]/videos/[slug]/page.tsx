import React from "react";
import VideoDetailsContent from "./components/VideoDetailsContent";
import Header from "@/src/app/[locale]/components/Shared/Header/Header";
import Footer from "@/src/app/[locale]/components/Shared/Footer/Footer";

const VideoDetails = () => {
  return (
    <>
      <Header />
      <VideoDetailsContent />
      <Footer />
    </>
  );
};

export default VideoDetails;

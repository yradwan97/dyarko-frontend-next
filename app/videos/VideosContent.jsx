'use client'
import React, { useEffect, useState } from 'react'
import Typography from "../components/Shared/Typography"
import Loader from '../components/Shared/Loader'
import VideoItem from "./VideoItem"
import Paginator from '../components/Shared/pagination/Pagination'
import { useGetVideos } from "./videoService"

const VideosContent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { videos, pages, itemsCount, isLoading, isFetching, refetch, isRefetching } = useGetVideos(currentPage)

    useEffect(() => {
        refetch();
    }, [refetch, currentPage]);

    if (isLoading || isFetching || isRefetching) return <Loader />

    return (
        <div className="container">
            <Typography
                variant="h2"
                as="h2"
                className="my-12 text-2xl font-bold leading-[44px] text-black sm:text-4xl sm:leading-[56px]"
            >
                All Videos {`(${itemsCount})`}
            </Typography>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
                {videos?.map((video, index) => (
                    <VideoItem
                        key={index}
                        className="!bg-main-100 !p-3"
                        videoData={video}
                    />
                ))}
            </div>
            <Paginator
                currentPage={currentPage}
                lastPage={pages}
                onChange={(page) => setCurrentPage(page)}
            />
        </div>
    )
}

export default VideosContent
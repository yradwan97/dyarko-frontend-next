import React, { useState } from 'react'
import Typography from '@/app/components/Shared/Typography';
import VideoItem from '@/app/videos/VideoItem';
import Paginator from '@/app/components/Shared/pagination/Pagination';

const UserVideos = ({ videos, isFetching, itemsCount, pages, refetch }) => {
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <div className="container">
            <Typography
                variant="h2"
                as="h2"
                className="my-12 text-2xl font-bold leading-[44px] text-black sm:text-4xl sm:leading-[56px]"
            >
                Owner's Videos {itemsCount !== undefined && `(${itemsCount})`}
            </Typography>
            {isFetching ? (
                <Typography as='h3' variant='body-md-medium'>Loading Videos...</Typography>
            ) : (
                <>
                    <div className="mt-6 grid grid-cols-1 text-center gap-4 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
                        {videos?.length > 0 ?
                            videos?.map((video, index) => (
                                <VideoItem
                                    key={index}
                                    className="!bg-main-100 !p-3"
                                    videoData={video}
                                />
                            ))
                            :
                            <Typography className='text-center' as='h3' variant='body-lg-medium'>No videos for this owner!</Typography>
                        }
                    </div>
                    {videos?.length > 0 && <Paginator
                        currentPage={currentPage}
                        lastPage={pages}
                        onChange={(page) => setCurrentPage(page)}
                    />}
                </>
            )}
        </div>
    )

}

export default UserVideos
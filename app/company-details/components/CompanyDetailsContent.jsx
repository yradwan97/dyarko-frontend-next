'use client'
import React, { useEffect, useState } from 'react';
import { useGetOwnerVideos } from '@/app/companies/ownersApi'
import Banner from './Banner';
import OwnerProperties from "./OwnerProperties"
import Typography from '@/app/components/Shared/Typography';
import Loader from '@/app/components/Shared/Loader';
import Footer from '@/app/components/Shared/Footer/Footer';
import ClientReview from './ClientReview';
import { useGetOwnerProperties } from '@/app/companies/ownersApi';
import BackButton from '@/app/components/Shared/BackButton';
import UserVideos from "./UserVideos"
import PropertyTypeTabs from "./PropertyTypeTabs"
import { useParams } from 'next/navigation';


function CompanyDetailsContent() {
    const { slug } = useParams()
    const [activeTab, setActiveTab] = useState('all');
    const [page, setPage] = useState(1);
    const {
        data: videos,
        isFetching: isVideosFetching,
        itemsCount: videosCount,
        pages: videosPages,
        refetch: refetchVideos
    } = useGetOwnerVideos(slug)

    const { properties, pages, totalCount, isFetching, refetch } = useGetOwnerProperties({
        owner: slug,
        payment_type: activeTab !== 'all' ? activeTab : undefined,
        page,
        size: 3,
    });
    useEffect(() => {
        refetch();
    }, [slug, activeTab, page, refetch]);

    return isFetching ? (
        <Loader />
    ) : (
        <>
            <div className="container my-6">
                <BackButton to="/companies" />
            </div>
            <Banner id={slug} />
            <div className="container">
                <PropertyTypeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {properties.length > 0 ?
                    <>
                        <OwnerProperties
                            page={page}
                            pages={pages}
                            properties={properties}
                            setPage={setPage}
                            totalCount={totalCount}
                        />
                    </>
                    :
                    <Typography className='mt-5' as='h3' variant='h3'>No properties yet!</Typography>
                }
                <ClientReview id={slug} />
                {videosCount > 0 &&
                    <UserVideos
                        isFetching={isVideosFetching}
                        itemsCount={videosCount}
                        pages={videosPages}
                        refetch={refetchVideos}
                        videos={videos}
                    />
                }
            </div>
            <Footer />
        </>
    );
}

export default CompanyDetailsContent;

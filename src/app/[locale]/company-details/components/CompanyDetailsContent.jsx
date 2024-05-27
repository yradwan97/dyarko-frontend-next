'use client'
import React, { useEffect, useState } from 'react';
import { useGetOwnerVideos } from '@/src/app/[locale]/companies/ownersApi'
import Banner from './Banner';
import OwnerProperties from "./OwnerProperties"
import Typography from '@/src/app/[locale]/components/Shared/Typography';
import Loader from '@/src/app/[locale]/components/Shared/Loader';
import ClientReview from './ClientReview';
import { useGetOwnerProperties } from '@/src/app/[locale]/companies/ownersApi';
import BackButton from '@/src/app/[locale]/components/Shared/BackButton';
import UserVideos from "./UserVideos"
import PropertyTypeTabs from "./PropertyTypeTabs"
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';


function CompanyDetailsContent() {
    const { slug } = useParams()
    const [activeTab, setActiveTab] = useState('all');
    const [page, setPage] = useState(1);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const t = useTranslations("Companies.Details")

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 600px)');

        const handleMediaQueryChange = (e) => {
            setIsSmallScreen(e.matches);
        };

        handleMediaQueryChange(mediaQuery); // Initial check
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    const {
        data: videos,
        isFetching: isVideosFetching,
        itemsCount: videosCount,
        pages: videosPages,
        refetch: refetchVideos
    } = useGetOwnerVideos(slug)

    const { properties, pages, totalCount, isFetching, refetch } = useGetOwnerProperties({
        owner: slug,
        payment_type: activeTab === "rent" ? activeTab : activeTab === "installment" ? "installment" : undefined,
        page,
        size: isSmallScreen ? 2 : 4,
    });
    useEffect(() => {
        refetch();
    }, [slug, activeTab, page, refetch]);

    return (
        <>
            <div className="container my-6">
                <BackButton to="/companies" />
            </div>
            <Banner id={slug} />
            <div className="container">
                <PropertyTypeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {properties?.length > 0 ?
                    <>
                        <OwnerProperties
                            activeTab={activeTab}
                            page={page}
                            isFetching={isFetching}
                            pages={pages}
                            properties={properties}
                            setPage={setPage}
                            totalCount={totalCount}
                        />
                    </>
                    :
                    <Typography className='mt-5' as='h3' variant='h3'>{t("no-properties")}</Typography>
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
        </>
    );
}

export default CompanyDetailsContent;

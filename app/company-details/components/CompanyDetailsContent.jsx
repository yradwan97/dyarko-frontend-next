'use client'
import { Tab } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Banner from './Banner';
import Typography from '@/app/components/Shared/Typography';
import BuildingSolid from '@/app/components/UI/icons/BuildingSolid';
import PropertiesSection from '@/app/landingPage/properties/PropertiesSection';
import Paginator from '@/app/components/Shared/pagination/Pagination';
import Loader from '@/app/components/Shared/Loader';
import Footer from '@/app/components/Shared/Footer/Footer';
import ClientReview from './ClientReview';
import { useGetOwnerProperties } from '@/app/companies/ownersApi';
import BackButton from '@/app/components/Shared/BackButton';
import UserVideos from "./UserVideos"

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function CompanyDetailsContent({ slug }) {

    const [activeTab, setActiveTab] = useState('all');
    const [page, setPage] = useState(1);

    const { properties, pages, totalCount, isFetching, refetch } = useGetOwnerProperties({
        owner: slug,
        payment_type: activeTab !== 'all' ? activeTab : undefined,
        page,
        size: 3,
    });
    useEffect(() => {
        refetch();
    }, [slug, activeTab, page]);

    return isFetching ? (
        <Loader />
    ) : (
        <>
            <div className="container my-6">
                <BackButton to="/companies" />
            </div>
            <Banner id={slug} />
            <div className="container">
                <Tab.Group>
                    <Tab.List className="mt-8 flex w-[150px] justify-between md:mt-0">
                        {['All', 'Rent', 'Buy'].map((tab) => (
                            <Tab
                                key={tab}
                                className={classNames(
                                    'text-md transition-ease border-b-3 pb-3 outline-0 duration-300',
                                    activeTab === tab.toLowerCase()
                                        ? ' border-main-600 font-bold text-main-600'
                                        : 'border-white font-regular text-black'
                                )}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                            >
                                {tab}
                            </Tab>
                        ))}
                    </Tab.List>
                </Tab.Group>

                {properties.length > 0 ? (
                    <>
                        <div className="mt-9 flex items-center justify-between">
                            <Typography variant="h2" as="h2" className="text-black">
                                All properties
                            </Typography>
                            <div className="hidden items-end sm:flex">
                                <BuildingSolid className="mr-3 h-5 w-5 fill-main-500" />
                                <Typography variant="body-sm" as="p" className="text-black/75">
                                    {`${totalCount} ${totalCount === 1 ? 'Property' : 'Properties'}`}
                                </Typography>
                            </div>
                        </div>
                        <PropertiesSection properties={properties} />
                        <Paginator lastPage={pages} page={page} onChange={(e) => setPage(e)} />
                    </>
                ) : (
                    <Typography variant="body-md" as="h2" className="mt-10 text-gray-400">
                        No properties here!
                    </Typography>
                )}
                <ClientReview id={slug} />
                <UserVideos id={slug} />
            </div>
            <Footer />
        </>
    );
}

export default CompanyDetailsContent;

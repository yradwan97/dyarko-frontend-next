'use client'
import BackButton from '@/app/components/Shared/BackButton'
import Header from '@/app/components/Shared/Header/Header'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Banner from "../components/Banner"
import { Tab } from '@headlessui/react'
import { useQuery, useQueryClient } from 'react-query'
import Typography from '@/app/components/Shared/Typography'
import BuildingSolid from '@/app/components/UI/icons/BuildingSolid'
import PropertiesSection from '@/app/landingPage/properties/PropertiesSection'
import Paginator from '@/app/components/Shared/pagination/Pagination'
import Loader from '@/app/components/Shared/Loader'
import Footer from '@/app/components/Shared/Footer/Footer'
import ClientReview from "../components/ClientReview"

const baseUrl = process.env.NEXT_PUBLIC_NEXT_APP_API_URI

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

const CompanyDetails = () => {
    const [page, setPage] = useState(1)
    const {slug} = useParams()
    const [activeTab, setActiveTab] = useState("all")

    const searchParams = new URLSearchParams()
    searchParams.delete("payment_type")
    if (activeTab !== "all") searchParams.append("payment_type", activeTab)
    searchParams.append("page", page.toString())
    searchParams.append("owner", slug as string)

    const {data, isLoading, refetch} = useQuery(["owner-properties"], 
        async () => await fetch(`${baseUrl}/properties?${searchParams.toString()}`).then(res => res.json())
    )    

    // TODO: To be removed
    
    const {data: property, refetch: refetchProperty} = useQuery("temp-owner-property", async () => await fetch(`${baseUrl}/properties?page=${page}&size=1`).then(res=>res.json()))
    
    useEffect(() => {
        refetch()    
        refetchProperty()    
    }, [slug, page, activeTab])
    // TODO: return all "property" back to "data"
  return isLoading ? <Loader/> : (
    <>
        <Header />
        <div className="container my-6">
            <BackButton to="/companies"/>
        </div>
        <Banner id={slug} />
        <div className="container">
                <Tab.Group>
                    <Tab.List className="mt-8 flex w-[150px] justify-between md:mt-0">
                        {["All", "Rent", "Buy"].map((tab, i) => (
                            <Tab
                                key={i}
                                onClick={() => {
                                    setActiveTab(tab.toLowerCase())
                                }}
                                className={({ selected }) =>
                                    classNames(
                                        "text-md transition-ease border-b-3 pb-3 outline-0 duration-300",
                                        selected
                                            ? " border-main-600 font-bold text-main-600"
                                            : "border-white font-regular text-black"
                                    )
                                }
                            >
                                {tab}
                            </Tab>
                        ))}
                    </Tab.List>
                </Tab.Group>

                {property?.data.length > 0 ? (
                    <>
                        <div className="mt-9 flex items-center justify-between">
                            <Typography variant="h2" as="h2" className="text-black ">
                                All properties
                            </Typography>
                            <div className="hidden items-end sm:flex">
                                <BuildingSolid className="mr-3 h-5 w-5 fill-main-500" />
                                <Typography variant="body-sm" as="p" className="text-black/75">
                                    {property?.data.length} {`${property?.data.length === 1 ? "Property" : "Properties"}`}
                                </Typography>
                            </div>
                        </div>
                        <PropertiesSection properties={property?.data} />
                        <Paginator
                            lastPage={property?.pages}
                            page={page}
                            onChange={(e) => setPage(e)}
                        />
                    </>
                ) : (
                    <Typography variant="body-md" as="h2" className="mt-10 text-gray-400">
                        This owner has no properties yet
                    </Typography>
                )}

                <ClientReview id={slug} />
            </div>
            <Footer />
    </>
  )
}

export default CompanyDetails
'use client'
import React, { useEffect, useState } from 'react'
import Header from '../components/Shared/Header/Header'
import BackButton from "../components/Shared/BackButton"
import Typography from '../components/Shared/Typography'
import Loader from '../components/Shared/Loader'
import SingleCompany from "./SingleCompany"
import { owner } from '../types/types'
import Button from '../components/Shared/Button'
import Footer from '../components/Shared/Footer/Footer'
import Paginator from '../components/Shared/pagination/Pagination'
import { useGetCompanies } from "./ownersApi"

const Companies = () => {
    
    const size = "10"
    const [page, setPage] = useState(1)
    const { isLoading, isFetching, data, refetch } = useGetCompanies(page.toString(), size)
    

    useEffect(() => {
        setTimeout(() => {
            refetch()
        }, 10)
    }, [page])

    if (isLoading || isFetching) return <Loader/>
    return (
        <>
            <Header />
            <div className="container pt-8 pb-28">
                <BackButton to="/"/>
                <Typography variant="h2" as="h2" className="mb-4 text-[40px] leading-[56px]">
                    Owners
                </Typography>
                <Typography
                    variant="body-lg-medium"
                    as="p"
                    className="mb-8 text-main-secondary md:w-1/2 md:text-black"
                >
                    We are working with 100+ owners from whom you can get your desired property.
                </Typography>
                
                <div className="flex flex-col gap-6">
                    {data?.data?.map((owner: owner, index:number) => (
                        <SingleCompany key={index.toString()} owner={owner}/>
                    ))}
                    <Paginator
                        lastPage={data?.pages}
                        page={page}
                        onChange={(e) => setPage(e)}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Companies
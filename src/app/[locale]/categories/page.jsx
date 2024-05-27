'use client'
import React, { useEffect, useState } from 'react'
import Header from '../components/Shared/Header/Header'
import Typography from "../components/Shared/Typography"
import { useQuery } from 'react-query'
import { axiosClient as axios } from "../services/axiosClient"
import { useSession } from 'next-auth/react'
import SingleCategory from "./SingleCategory"
import Footer from '../components/Shared/Footer/Footer'
import { useLocale, useTranslations } from 'next-intl'

const Categories = () => {
    const { data: session } = useSession()
    const [categories, setCategories] = useState([])
    const locale = useLocale()
    const t = useTranslations("General.Categories")
    const { data, refetch } = useQuery(
        ["categories", session?.user?.accessToken],
        async () => await axios.get(`/properties/categories`).then(response => {

            if (response.status === 200) {
                setCategories(response.data.data)
            }

        }),
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true
        }

    )

    useEffect(() => {
        refetch()
    }, [session, refetch])


    return (
        <>
            <Header />
            <div className="bg-gradient-to-b from-main-100 to-white">
                <div className="container py-20">
                    <Typography variant='body-lg-bold' as='p' className={`text-black text-center`}>
                        {t("title")}
                    </Typography>
                    {categories.length > 0 ? (
                        <div className="mt-6 grid grid-cols-1 md:mt-10 md:gap-5 md:grid-cols-2 lg:grid-cols-4">
                            <>
                                {categories.map((category, index) => (
                                    <SingleCategory key={index} category={category} />
                                ))}
                            </>
                        </div>
                    ) : (
                        <Typography variant='body-lg-bold' as='h1' className={`text-black !text-center mt-12`}>
                            {t("no-data")}
                        </Typography>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Categories
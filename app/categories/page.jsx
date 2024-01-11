'use client'
import React, { useEffect, useState } from 'react'
import Header from '../components/Shared/Header/Header'
import Typography from "../components/Shared/Typography"
import { useQuery } from 'react-query'
import { useGetCompanies } from '../companies/ownersApi'
import { axiosClient as axios } from "../services/axiosClient"
import { useSession } from 'next-auth/react'
import SingleCategory from "./SingleCategory"

const Categories = () => {
    const { data: session } = useSession()
    const [categories, setCategories] = useState([])

    const { data, refetch } = useQuery(["categories", session?.user?.accessToken],
        async () => await axios.get(`/properties/categories`).then(response => {

            if (response.status === 200) {
                setCategories(response.data.data)
            }

        })

    )

    useEffect(() => {
        refetch()
    }, [session])


    return (
        <>
            <Header />
            <div className="bg-gradient-to-b from-main-100 to-white">
                <div className="container mx-auto py-20">
                    <Typography variant='body-lg-bold' as='p' className="text-black mr-auto">
                        Property Categories
                    </Typography>
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-10 md:gap-8 lg:grid-cols-3">
                        {categories.length > 0 && categories.map(category => {
                            return <SingleCategory category={category} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories
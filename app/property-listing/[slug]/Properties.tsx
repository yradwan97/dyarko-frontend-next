'use client'
import Header from '@/app/components/Shared/Header/Header'
import React, { useEffect, useState } from 'react'
import { Suspense } from 'react'
import Loader from '@/app/components/Shared/Loader'
import PropertiesSection from '@/app/landingPage/properties/PropertiesSection'
import Paginator from '@/app/components/Shared/pagination/Pagination'
import { Property } from '@/app/types/types'
import SearchControl from '../search/SearchControl'
import Loading from "./loading"
import { useSearchParams } from 'next/navigation'
import { useGetProperties } from '../propertiesApis'
import { removePlusFromParam } from '@/app/utils/utils'

interface T {
  message: string
  data: Property[]
  pages: number
  itemsCount: number
}



const baseUrl = process.env.NEXT_PUBLIC_NEXT_APP_API_URI


const Properties = ({slug}: any) => {
    const [page, setPage] = useState(1)
    const searchParameters = useSearchParams()
    const pageSize = 6

    const [filters, setFilters] = useState<any>({
      price_from : null, 
      price_to : null, 
      city : "", 
      available_date : null,
      property_type: ""
    })

    let url = new URL(`${baseUrl!}/properties?`)
    let searchParams = new URLSearchParams(url.search)
    searchParams.append("page", page.toString())
    searchParams.append("payment_type", slug)
    searchParams.append("size", pageSize.toString())
    if (filters.price_from) searchParams.append('price_from', filters.price_from)
    if (filters.price_to) searchParams.append('price_to', filters.price_to)
    if (filters.city) searchParams.append('city', filters.city)
    if (filters.property_type) searchParams.append('type', filters.property_type)
    if (filters.available_date) searchParams.append('available_date', filters.available_date) 

    if (searchParameters.get("category") !== null) {
      searchParams.append("category", searchParameters.get("category") as string)
    }
    if (searchParameters.get("city") !== null) {
      searchParams.append("city", searchParameters.get("city") as string)
    }
    
    const {isLoading, data, refetch} = useGetProperties(searchParams.toString())
    
    useEffect(() => {
      refetch()
      console.log(searchParams.toString())
    }, [page, filters]) 
    
    const handleReset = () => {
      setFilters({
        price_from : null, 
        price_to : null, 
        city : "", 
        available_date : null,
        property_type: ""
      })
      setPage(1)  
    }
    
  return (
    <>
      <Suspense fallback={<Loading/>}>
        <Header/>
        <div className="bg-gradient-to-b from-main-100 to-white">
        <div className="container mx-auto py-20">
        <SearchControl onReset={handleReset} slug={slug} onSearch={(filters) => setFilters(filters)} />
        {isLoading ? <Loader/> : 
        <>
          <PropertiesSection properties={data ? data.data : []} />
          <Paginator
            lastPage={data?.pages || 1}
            page={page}
            onChange={(e) => setPage(e)}
          />
          </>
        }
        </div>
        </div>
      </Suspense>
    </>
  )
}

export default Properties
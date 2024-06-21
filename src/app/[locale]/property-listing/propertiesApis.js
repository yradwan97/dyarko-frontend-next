import {useQuery} from "react-query"
import {axiosClient as axios} from "../services/axiosClient"
import { capitalizeFirst } from "../utils/utils";
import {useGetSavedProperties} from "@/src/app/[locale]/user/userApi"

const baseUrl = process.env.NEXT_PUBLIC_NEXT_APP_API_URI

export const useGetPropertyTypes = () => {
    const {data, isLoading, isSuccess} = useQuery("property-types",  
        async () => await axios.get(`/properties/types`).then(response => {    
            if (response.status === 200) {
                let finalTypes = response.data.data.map((type) => {
                    return {
                        name: capitalizeFirst(type),
                        value: type
                    }
                })
                return finalTypes
            } else {
                throw new Error("Failed to fetch types.")
            }
            
    }),
    {
        refetchOnWindowFocus: false,
        refetchOnReconnect: true
    })
    return {data, isLoading, isSuccess}
}

export const useGetSingleProperty = (id) => {
    const {isLoading, data, refetch, isSuccess} = useQuery(
        ["property-details", id], 
        async () => await axios.get(`/properties/${id}`),
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            
        }
    )
    // if (isSuccess) {
    //     createPropertyView(id)
    // }
    return {
        data,
        isLoading,
        refetch
    }
}

export const createPropertyView = async (id) => {
    try {
        let res = await axios.post(`/properties/${id}/views`)
    } catch (e) {
        console.error(e)
    }
}

export const useGetProperties = (searchParams = "") => {
    let params = typeof searchParams === 'object' ? searchParams[0] : searchParams
    const {isLoading, data, refetch} = useQuery(
        ["properties", searchParams],
        async () => await axios.get(`/properties?${params}`),
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true
        }
    )

    return {data: data?.data, totalCount: data?.data.itemsCount || 0, isLoading, refetch}
}

export const useIsPropertySaved = (propertyId) => {
    const {data} = useGetSavedProperties(1)
    let match = data?.find(p => p.property && p.property._id === propertyId) || false
    return match ? true : false
}
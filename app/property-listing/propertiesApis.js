import {useQuery} from "react-query"
import {axiosClient as axios} from "../services/axiosClient"
import { capitalizeFirst } from "../utils/utils";
import {useGetSavedProperties} from "@/app/user/userApi"

const baseUrl = process.env.NEXT_PUBLIC_NEXT_APP_API_URI

export const useGetPropertyTypes = (accessToken) => {
    

    const {data, isLoading, isSuccess} = useQuery("property-types",  
        async () => await axios.get(`/properties/types`, {
            headers: {
                "auth-token": `Bearer ${accessToken}`
            }
        }).then(response => {    
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
    const {isLoading, data, refetch} = useQuery(
        ["property-details"], 
        async () => await axios.get(`/properties/${id}`),
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true
        }
    )

    return {
        data,
        isLoading,
        refetchSingleProperty: refetch
    }
}

export const useGetProperties = (searchParams = "") => {
    
    const {isLoading, data, refetch} = useQuery(
        ["properties", searchParams],
        async () => await axios.get(`/properties?${searchParams}`),
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
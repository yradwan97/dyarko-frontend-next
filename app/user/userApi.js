import { useQuery } from "react-query"
import {axiosClient as axios} from "../services/axiosClient"

export const useGetWalletData = (accessToken, page = 1) => {
    const {data, isLoading, isError, isSuccess, refetch} = useQuery(
        ["user-wallet", page],
        async () => await axios.get(`/wallet?page=${page}`)
    )

    return {
        data: isSuccess ? data?.data : null,
        isSuccess,
        isError,
        isLoading,
        refetch 
    }
}

export const useGetSavedProperties = (filterFlag = true) => {
    const {data, isLoading, isError, isSuccess, refetch} = useQuery(
        "saved-properties",
        async () => await axios.get(`/save_properties`).then(response => {
            if (filterFlag) {
                return response?.data?.data?.filter(d => d.property !== null)
            } else {
                return response?.data?.data
            }
        })
    )

    return {
        data: isSuccess ? data : null,
        isSuccess,
        isError,
        isLoading,
        refetch 
    }
}

export const useGetTransactions = (accessToken, page = 1) => {
    const {data, isSuccess, isLoading, refetch} = useQuery(
        ["transactions", page],
        async () => await axios.get(`/wallet/transactions?page=${page}`)
    )
        return {data: isSuccess ? data?.data : null, isLoading, isSuccess, refetch}
}

export const useGetRequests = (endpoint) => {
    const {data, isSuccess, isLoading, refetch} = useQuery(
        ["requests", endpoint],
        async () => await axios.get(endpoint)
    )

    return {data: isSuccess ? data?.data : null, isLoading, isSuccess, refetch}
}

export const useGetRealEstates = (endpoint) => {
    const {data, isSuccess, isLoading, refetch} = useQuery(
        ["real-estates", endpoint],
        async () => await axios.get(endpoint).then(res => {
            
            if (res.status == 200) {
                res.data.data = res.data.data.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                  
                    // Compare the dates in descending order
                    return dateB - dateA;
                });
            }

            return res
        }),
        {
            refetchOnWindowFocus: false
        }
    )

    return {data: isSuccess ? data?.data : null, isLoading, isSuccess, refetch}
}
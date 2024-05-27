import { useQuery } from "react-query"
import {axiosClient as axios} from "../services/axiosClient"

export const useGetWalletData = (page = 1) => {
    const {data, isLoading, isError, isSuccess, refetch} = useQuery(
        ["user-wallet", page],
        async () => await axios.get(`/wallet?page=${page}`),
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true
        }
    )
    return {
        data: isSuccess ? data?.data : null,
        isSuccess,
        isError,
        isLoading,
        refetch 
    }
}

export const useGetPrizesData = () => {
    const {data, isSuccess} = useQuery(
        "static-prizes",
        async () => await axios.get("/static/prizes"),
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true
        }
    )

    return {
        prizes: isSuccess ? data?.data?.data : null,
        isSuccess
    }
}

export const useGetSavedProperties = (page = 1) => {
    const {data, isLoading, isError, isSuccess, refetch} = useQuery(
        "saved-properties",
        async () => await axios.get(`/save_properties?page=${page}`),
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true
        }
    )
    return {
        data: isSuccess ? data?.data?.data : null,
        pages: data?.data.pages,
        itemsCount: data?.data?.itemsCount,
        isSuccess,
        isError,
        isLoading,
        refetch 
    }
}

export const useGetTransactions = (page = 1) => {
    const {data, isSuccess, isLoading, refetch} = useQuery(
        ["transactions", page],
        async () => await axios.get(`/wallet/transactions?page=${page}`).then(res => {
            
            if (res.status == 200) {
                res.data.data.wallet = res.data.data.wallet.sort((a, b) => {
                    const dateA = new Date(a.paid_at);
                    const dateB = new Date(b.paid_at);
                  
                    // Compare the dates in descending order
                    return dateB - dateA;
                });
            }
            return res
        }),
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true
        }
    )
        return {data: isSuccess ? data?.data : null, isLoading, isSuccess, refetch}
}

export const useGetRequests = (endpoint) => {
    const {data, isSuccess, isLoading, refetch} = useQuery(
        ["requests", endpoint],
        async () => await axios.get(endpoint),
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true
        }
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
            refetchOnWindowFocus: false,
            refetchOnReconnect: true
        }
    )

    return {data: isSuccess ? data?.data : null, isLoading, isSuccess, refetch}
}

export const useGetNotifications = (page = 1) => {
        const {data, isSuccess, isFetching, refetch} = useQuery(["notifications", page],
            async () => await axios.get(`/notifications?sort=is_read&page=${page}`), 
            {
                refetchOnWindowFocus: false,
                refetchOnReconnect: true
            }
        )
        return {data: isSuccess ? data?.data : null, isSuccess, isFetching, refetch}
};

export const useGetUser = (accessToken) => {
    const {data, isSuccess, isFetching, refetch} = useQuery("user-profile",
        async () => await axios.get("/users", {
            headers: {
              "auth-token": `Bearer ${accessToken}`
            }
          }),
          {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true
          }
    )

    return {
        data: isSuccess ? data?.data?.data : null,
        isSuccess,
        isFetching,
        refetch
    }
  }
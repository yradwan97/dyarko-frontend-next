import React from "react";
import { useQuery } from 'react-query'
import {axiosClient as axios} from "../services/axiosClient"

export const useGetCompanies = (page = "1", size = "10") => {
    const { isLoading, isFetching, data, refetch, isSuccess } = useQuery("owners", 
        async () => await fetch(`https:api.dyarko.com/owners?page=${page}&size=${size}`)
            .then(res => res.json()) );

    return {
        data: isSuccess ? data : null,
        isSuccess,
        isLoading,
        isFetching,
        refetch
    }
}

export const sendFollowRequest = async (id, accessToken) => {
    let followRequestBody = {
        "owner": id
    }

    try {
        const response = await axios.post(`/follow`, followRequestBody)
        console.log(response)
    } catch (e) {
        console.log(e)
    }
}

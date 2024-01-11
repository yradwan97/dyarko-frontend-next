import { useQuery } from "react-query";
import {axiosClient as axios} from "../services/axiosClient"

const baseUrl = process.env.NEXT_PUBLIC_NEXT_APP_API_URI

export const useGetVideos = (page = 1, searchParams = "size=9") => {
    
    const {data, isLoading, isFetching, refetch, isRefetching} = useQuery("videos", 
        async () => await axios.get(`/videos?page=${page}&${searchParams?.toString()}`)
    )

    return {
        videos: data?.data.data,
        pages: data?.data.pages || 0,
        itemsCount: data?.data.itemsCount || 0,
        isFetching,
        isLoading,
        isRefetching,
        refetch
    }
}

export const useGetVideo = (id) => {
    const {
        data, 
        isLoading, 
        isSuccess, 
        refetch
    } = useQuery("video-details", 
        async () => await axios.get(`/videos/${id}`)
    )

    const {
        data: comments, 
        isSuccess: isCommentsSuccess,
        isLoading: isCommentsLoading, 
        refetch: refetchComments
    } = useQuery("video-comments", 
        async () => await axios.get(`/videos/${id}/comments`)
    )

    return {
        video: isSuccess ? data?.data.data : null,
        refetch,
        isLoading,
        comments: isCommentsSuccess ? comments?.data.data : null,
        isCommentsLoading,
        refetchComments
    }
}



export const likeVideo = async (id, accessToken) => {
    
    let res = await axios.post(`/videos/${id}/likes`)
    return res
}

export const addComment = async (comment, id, accessToken) => {
    console.log("from add comment", {comment, id, accessToken})
    const body = {
        "comment": comment
    }  

    let response = axios.post(`/videos/${id}/comments`, body)

    return response
}

export const likeVideoComment = async (id) => {
    let res = await axios.post(`/videos/comments/${id}/likes`)
    return res
}
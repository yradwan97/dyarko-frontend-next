import { useQuery } from "react-query";
import {axiosClient as axios} from "../services/axiosClient"

const baseUrl = process.env.NEXT_PUBLIC_NEXT_APP_API_URI

export const useGetVideos = (page = 1, searchParams = "size=9") => {
    
    const {data, isLoading, isFetching, refetch, isRefetching} = useQuery("videos", 
        async () => await axios.get(`/videos?page=${page}&${searchParams?.toString()}`),
        {
            refetchOnWindowFocus: false
        }
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
        async () => await axios.get(`/videos/${id}`),
        {
            refetchOnWindowFocus: false
        }
    )

    const {
        data: comments, 
        isSuccess: isCommentsSuccess,
        isLoading: isCommentsLoading, 
        refetch: refetchComments
    } = useQuery("video-comments", 
        async () => await axios.get(`/videos/${id}/comments`),
        {
            refetchOnWindowFocus: false
        }
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



export const likeVideo = async (id, isLiked) => {
    if (isLiked) {
        let res = await axios.delete(`/videos/${id}/likes`)
        return res
    } else {
        try {
            let res = await axios.post(`/videos/${id}/likes`)
            console.log("liked", res)
            return res
        } catch (e) {
            console.error(e)
        }
    }
}

export const addComment = async (comment, id, accessToken) => {
    console.log("from add comment", {comment, id, accessToken})
    const body = {
        "comment": comment
    }  

    let response = axios.post(`/videos/${id}/comments`, body)

    return response
}

export const likeVideoComment = async (id, isLiked) => {
    console.log(isLiked)
    if (isLiked) {
        try {
            let res = await axios.dlete(`/videos/comments/${id}/likes`)
            console.log("unliked", res)
        } catch (e) {
            console.error(e)
        }
        return res  
    } else {
        try {
            let res = await axios.post(`/videos/comments/${id}/likes`)
            console.log("liked", res)
        } catch (e) {
            console.error(e)
        }

        return res  
    }
}
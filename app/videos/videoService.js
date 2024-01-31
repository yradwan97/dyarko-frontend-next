import { useQuery } from "react-query";
import {axiosClient as axios} from "../services/axiosClient"

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
        isFetching, 
        isSuccess, 
        refetch
    } = useQuery("video-details", 
        async () => await axios.get(`/videos/${id}`),
        {
            refetchOnWindowFocus: false
        }
    )

    

    return {
        video: isSuccess ? data?.data.data : null,
        refetch,
        isFetching
    }
}
export const useGetVideoComments = (id) => {
    const {
        data, 
        isSuccess,
        isFetching,
        refetch,
    } = useQuery("video-comments", 
        async () => await axios.get(`/videos/${id}/comments`),
        {
            refetchOnWindowFocus: false
        }
    )
    console.log(data?.data?.data)
    return {
        comments: isSuccess ? data?.data?.data : null,
        isFetching,
        refetch
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

export const addComment = async (comment, id) => {
    const body = {
        "comment": comment
    }  

    let response = axios.post(`/videos/${id}/comments`, body)

    return response
}

export const likeVideoComment = async (id, isLiked) => {
    //TODO: confirm after backend is done.
    console.log(isLiked)
    try {
        let res;
        if (isLiked) {
            res = await axios.delete(`/videos/comments/${id}/likes`)
            console.log("unliked", res.data.data)
        } else {
            res = await axios.post(`/videos/comments/${id}/likes`)
            console.log("liked", res.data.data)  
        }
        return res  
    } catch (e) {
        console.error(e)
        return 
    }
}
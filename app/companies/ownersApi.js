import { useMutation, useQuery, useQueryClient } from "react-query";
import {axiosClient as axios} from "../services/axiosClient"

export const useGetCompanies = (page = "1", size = "10") => {
    const { isLoading, isFetching, data, refetch, isSuccess } = useQuery("owners", 
        async () => await axios.get(`/owners?page=${page}&size=${size}`)
    );

    return {
        data: isSuccess ? data.data : null,
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

export const getLoggedInUser = async (accessToken) => {
    let res = await axios.get("/users", {
        headers: {
            "auth-token" : `Bearer ${accessToken}`
        }
    })
    console.log(res.data)
    return res.data
}

export const isFollowed = async (followers, accessToken) => {
    let user = await getLoggedInUser(accessToken)
    if (user) {
        let match = followers.length === 0 ? false : followers.indexOf(user.data._id) > -1
        return match
    }
    return false
}

export const addReview = async (review) => {
    try {
        const data = await fetch(`${baseUrl}/owners/reviews`, {
            method: "POST",
            body: JSON.stringify(review)
        }).then(res => res.json());
        return {
            success: data.success,
            data,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
        };
    }
};

export const useAddReview = () => {
    const queryClient = useQueryClient();

    const { isLoading, mutate, isSuccess, reset } = useMutation(addReview, {
        onSuccess: (data) => {
            queryClient.setQueryData(["review", data], data);
        },
    })
    return { isLoading, addReview: mutate, isSuccess, reset };
};

export const getAllReviews = async (id) => {
    const response = await fetch(`https://api.dyarko.com/owners/${id}/reviews`).then(res => res.json());
    return {
        reviews: response.data,
        pages: response.pages,
        itemsCount: response.itemsCount,
    };
};

export const useGetReviews = (id) => {
    const { isSuccess, data, isLoading, isError } = useQuery(["owner-review"], 
    () => getAllReviews(id)
    );
    return {
        data: isSuccess === true ? data : undefined,
        isLoading,
        isError,
    };
};

export const getSingleOwner = (id, accessToken) => {
    const { data, isSuccess, isFetching, isLoading, refetch } = useQuery("owner", 
        async () => await axios.get(`/owners/${id}`, {
            headers: {
                "auth-token": `Bearer ${accessToken}`
            }
        })
    )

    return {
        data: isSuccess ? data?.data : null,
        isSuccess,
        isLoading,
        isFetching,
        refetch
    }
}
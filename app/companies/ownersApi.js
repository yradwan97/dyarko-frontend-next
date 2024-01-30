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

export const useGetOwnerProperties = ({ owner, payment_type, page, size }) => {
    const queryParams = new URLSearchParams();
    queryParams.append('owner', owner);
    if (payment_type) queryParams.append('payment_type', payment_type);
    queryParams.append('page', page.toString());
    queryParams.append('size', size.toString());
  
    const { isFetching, data, refetch, isSuccess } = useQuery(
      ['ownerProperties', queryParams.toString()],
      async () => {
        const response = await axios.get(`/properties?${queryParams.toString()}`);
        return response.data;
      }, {
        refetchOnWindowFocus: false
      }
    );
  
    return {
      properties: isSuccess ? data.data : null,
      isSuccess,
      totalCount: isSuccess ? data.itemsCount : 0,
      pages: data?.pages || 1,
      isFetching,
      refetch,
    };
  };

export const sendFollowRequest = async (id, accessToken) => {
    let followRequestBody = {
        "owner": id
    }

    try {
        const response = await axios.post(`/follow`, followRequestBody)
        console.log(response)
        return response
    } catch (e) {
        console.log(e)
    }
}

export const isFollowed = async (ownerId, accessToken) => {
    if (ownerId && accessToken) {
        let following = await axios.get("/follow", {
            headers: {
                "auth-token": `Bearer ${accessToken}`
            }
        })
        if (following?.data?.data.length > 0) {
            following = following.data.data
        }
        return following.length === 0 ? false : following.indexOf(following.find(f => f._id === ownerId)) > -1
    }
    return false
}

export const addReview = async (review) => {
    try {
        const data = await axios.post(`/owners/reviews`, review)
        return {
            success: data.success,
            data,
        };
    } catch (error) {
        console.error(error)
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
    try {
      const response = await axios.get(`/owners/${id}/reviews`);
      return {
        reviews: response.data.data,
        pages: response.data.pages,
        itemsCount: response.data.itemsCount,
      };
    } catch (error) {
      throw new Error('Failed to fetch reviews');
    }
  };
  
  export const useGetReviews = (id) => {
    const { isSuccess, data, isFetching, isError, refetch } = useQuery(
      ['owner-reviews', id], // Unique key for the query including owner's ID
      () => getAllReviews(id),
      {
        refetchOnWindowFocus: false
      }
    );
  
    return {
      data: isSuccess ? data : undefined,
      isFetching,
      refetch,
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

export const getOwnerVideos = (ownerId) => {
  const { data, isSuccess, isFetching, refetch } = useQuery(
    ["owner-videos", ownerId], 
        async () => await axios.get(`/videos/users/${ownerId}`)
    )
    return {
        data: isSuccess ? data?.data.data : null,
        isSuccess,
        pages: isSuccess ? data?.data.pages : 1,
        itemsCount: isSuccess ? data?.data.itemsCount : 0,
        isFetching,
        refetch
    }
}
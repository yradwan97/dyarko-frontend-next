import { useMutation, useQuery, useQueryClient } from "react-query";

const baseUrl = process.env.NEXT_PUBLIC_NEXT_APP_API_URI

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

export const useGetProperty = (id) => {
    const {data, isFetching, refetch, isLoading, isRefetching, isSuccess} = useQuery("single-property",
            async () => await fetch(`${baseUrl}/properties/${id}`).then(res => res.json())
    )

    return {
        data: isSuccess ? data : null,
        isSuccess,
        isFetching,
        isLoading,
        isRefetching,
        refetch
    }
}
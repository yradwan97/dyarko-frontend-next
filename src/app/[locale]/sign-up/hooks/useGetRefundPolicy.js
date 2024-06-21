import { useQuery } from "react-query"
import { noAuthAxios } from "../../services/axiosClient"


export const useGetRefundPolicy = () => {
    const {data, isSuccess, refetch} = useQuery(
        ['refund-policy'],
        async () => noAuthAxios.get("/settings/refund_policy").then(res => {
            res.data.data = res.data.data.filter((d) => d.type === 'user')
            return res.data
        }),
        {
            refetchOnReconnect: true,
            refetchOnWindowFocus: false
        }
    )

    return {
        policies: data?.data,
        isSuccess,
        refetch
    }
}
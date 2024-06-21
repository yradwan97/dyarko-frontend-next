import { useQuery } from "react-query"
import { noAuthAxios } from "../../services/axiosClient"


export const useGetTermsAndConditions = () => {
    const {data, isSuccess, refetch} = useQuery(
        ['terms-conditions'],
        async () => noAuthAxios.get("/settings/terms_conditions").then(res => {
            res.data.data = res.data.data.filter((d) => d.type === 'user')
            return res.data
        }),
        {
            refetchOnReconnect: true,
            refetchOnWindowFocus: false
        }
    )
    return {
        terms: data?.data,
        isSuccess,
        refetch
    }
}
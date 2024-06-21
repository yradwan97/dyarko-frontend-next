import { useQuery } from 'react-query'
import { noAuthAxios } from '../../services/axiosClient'

export const useGetPrivacyPolicy = () => {
    const {data, isSuccess, refetch} = useQuery(
        ['privacy-policy'],
        async () => noAuthAxios.get("/settings/privacy_policy").then(res => {
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
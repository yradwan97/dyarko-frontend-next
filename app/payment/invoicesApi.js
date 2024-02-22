import {axiosClient as axios} from "../services/axiosClient"
import {useQuery} from "react-query"

export const useGetInvoice = (id, type) => {
    let endpoint = type === "rent" ? `/invoices/${id}` : `/installments_invoices/${id}`
    const {data, isFetching, refetch, isSuccess} = useQuery(["single-invoice", id],
        async () => await axios.get(endpoint), 
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true
        }
    )

    return {
        invoice: isSuccess ? data?.data?.data : null,
        isFetching,
        refetch
    }
}

export const payInvoice = async (id, type, accessToken) => {
    let payBody = {
        "payment_method": "KNET"
    }
    let endpoint = type === "rent" ? `/invoices/${id}` : `/installments_invoices/${id}/pay`
    let res = await axios.post(endpoint, payBody,  {
        headers: {
            "auth-token": `Bearer ${accessToken}`
        }
    })

    return res.data
}
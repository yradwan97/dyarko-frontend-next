import {axiosClient as axios} from "../services/axiosClient"
import {useQuery} from "react-query"

export const useGetInvoice = (id, accessToken = "") => {
    const {data, isFetching, refetch, isSuccess} = useQuery(["single-invoice", id],
        async () => await axios.get(`/installments_invoices/${id}`), 
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

export const payInvoice = async (id, accessToken) => {
    let payBody = {
        "payment_method": "KNET"
    }
    let res = await axios.post(`/installments_invoices/${id}/pay`, payBody,  {
        headers: {
            "auth-token": `Bearer ${accessToken}`
        }
    })

    return res.data
}
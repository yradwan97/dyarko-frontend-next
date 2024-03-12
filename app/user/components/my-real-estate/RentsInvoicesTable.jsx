import React from 'react'
import { format } from "date-fns"
import { capitalizeFirst } from "@/app/utils/utils";
import Button from '@/app/components/Shared/Button';
import { useRouter } from 'next/navigation';


const RentsInvoicesTable = ({ invoices, selected, type, onSelect }) => {
    const router = useRouter()
    const handlePayButtonClick = (e, id) => {
        e.preventDefault()
        e.stopPropagation()
        router.push(`/payment/${type}s/${id}`)
    }
    return (
        <table className="w-full table-auto text-center">
            <thead>
                <tr className="flex justify-between">
                    <th className="text-md flex-1 text-left font-bold text-black">
                        {selected.name === "paid" ? "Paid On" : "Due on"}
                    </th>
                    <th className={`text-md flex-1 text-center font-bold text-black`}>
                        Purpose
                    </th>
                    <th className={`text-md flex-1 ${selected.name === "unpaid" ? "text-center" : "text-right"} font-bold text-black`}>
                        Amount
                    </th>
                    {selected.name === "unpaid" && <th className="text-md flex-1 text-right mr-2 font-bold text-black">
                        Pay
                    </th>}
                </tr>
            </thead>
            <tbody>
                {invoices.data.filter(i => i.status === selected.name.toUpperCase()).map((invoice, index) => (
                    <tr key={index} className={`flex ${invoice.pdf ? "cursor-pointer" : "cursor-default"} justify-between items-center border-b border-main-100 px-2 py-4 hover:bg-main-100`}
                        onClick={() => onSelect(invoice._id)}>
                        <td className="flex-1 text-left text-sm font-medium text-black">
                            {format(selected.name === "paid" ?
                                new Date(invoice?.paid_at)
                                :
                                (invoice?.extendRequestStatus && invoice?.extendRequestStatus === "APPROVED")
                                    ?
                                    new Date(invoice.extend_date) : new Date(invoice?.date), "dd/MM/yyyy")}
                        </td>
                        <td className="flex-1 capitalize text-center text-sm font-medium text-black">
                            {invoice?.title} - {capitalizeFirst(invoice?.property[0]?.type)}
                        </td>
                        <td className={`flex-1 ${selected.name === "unpaid" ? "text-center" : "text-right"} text-sm font-medium text-main-yellow-500`}>
                            KWD {Math.abs(invoice?.amount)}
                        </td>
                        {selected.name === "unpaid" && <td className={`flex-1 capitalize text-right text-sm font-medium text-black`}>
                            <Button variant='primary' className='!px-3 !py-1' onClick={(e) => handlePayButtonClick(e, invoice._id)}>
                                Pay
                            </Button>
                        </td>}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default RentsInvoicesTable
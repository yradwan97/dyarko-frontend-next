import React from 'react'
import { format } from "date-fns"
import Button from '@/src/app/[locale]/components/Shared/Button';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

const InstallmentInvoicesTable = ({ invoices, selected, onSelect, type }) => {
    const router = useRouter()
    const t = useTranslations("Account.RealEstates.InvoicesTables.Installment")
    const locale = useLocale()
    const handlePayButtonClick = (e, id) => {
        e.preventDefault()
        e.stopPropagation()
        router.push(`/payment/${type}s/${id}`)
    }
    return (
        <table className="w-full table-auto text-center">
            <thead>
                <tr className={`flex ${locale === "ar" ? "flex-row-reverse" : "flex-row"} justify-between`}>
                    <th className="text-md flex-1 text-center font-bold text-black">
                        {t("invoice-no")}
                    </th>
                    <th className="text-md flex-1 text-center font-bold text-black">
                        {selected.name === "paid" ? t("paid-on") : t("due-on")}
                    </th>
                    <th className="text-md flex-1 text-center font-bold text-black">
                        {t("amount")}
                    </th>
                    {selected.name === "unpaid" && <th className="text-md flex-1 text-center mr-2 font-bold text-black">
                        {t("pay")}
                    </th>}
                </tr>
            </thead>
            <tbody>
                {invoices.data.filter(i => i.status === selected.name.toUpperCase()).map((invoice, index) => (
                    <tr key={index} className={`flex ${locale === "ar" ? "flex-row-reverse" : "flex-row"} ${invoice.pdf ? "cursor-pointer" : "cursor-default"} justify-between border-b border-main-100 px-2 py-7 hover:bg-main-100`}
                        onClick={() => onSelect(invoice._id)}>
                        <td className="flex-1 capitalize text-center text-sm font-medium text-black">
                            {invoice?.invoice_no}
                        </td>
                        <td className="flex-1 capitalize text-center text-sm font-medium text-black">
                            {invoice?.status === "PAID" ? format(new Date(invoice?.updatedAt), "dd/MM/yyyy") : format(new Date(invoice?.date), "dd/MM/yyyy")}
                        </td>
                        <td className="flex-1 text-center text-sm font-medium text-main-yellow-500">
                            {Math.abs(invoice?.amount)} {t("kwd")}
                        </td>
                        {selected.name === "unpaid" && <td className={`flex-1 capitalize text-center text-sm font-medium text-black`}>
                            <Button variant='primary' onClick={(e) => handlePayButtonClick(e, invoice._id)}>
                                {t("pay")}
                            </Button>
                        </td>}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default InstallmentInvoicesTable
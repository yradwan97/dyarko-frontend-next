'use client'
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import Typography from "../../../components/Shared/Typography"
import Select from "@/app/components/Shared/Form/Select";
import { axiosClient as axios } from "@/app/services/axiosClient"
import { format } from "date-fns"
import Paginator from "@/app/components/Shared/pagination/Pagination"
import { capitalizeFirst } from "@/app/utils/utils";
import PDFViewer from "./PDFViewer";

const values = [
  { name: "paid", icon: "Paid" },
  { name: "unpaid", icon: "Unpaid" }
];
const Invoices = ({ setShowRequest, id, type }) => {
  const [selected, setSelected] = useState(type && type === "installment" ? values[1] : values[0]);
  const [page, setPage] = useState(1)
  const [invoices, setInvoices] = useState({ data: [], itemCount: 0, pages: 1 })
  const [showInvoice, setShowInvoice] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState()



  const handleInvoiceSelection = (invoiceId) => {
    setSelectedInvoice((prevSelectedInvoice) => {
      const selectedInvoice = invoices.data?.find((invoice) => invoice._id === invoiceId);

      if (selectedInvoice) {
        setShowInvoice(true);
      }

      return selectedInvoice;
    });
  };


  useEffect(() => {
    const getInvoices = async () => {
      let endpoint = type === "rent" ? `/invoices?property=${id}&page=${page}` : `/installments_invoices?page=${page}`
      try {
        let response = await axios.get(endpoint)

        if (response.status === 200) {
          setInvoices(response.data)
        }
      } catch (e) {
        console.error(e)
      }
    }

    getInvoices()
  }, [id, page, type])

  if (showInvoice) {
    return <PDFViewer setShowInvoice={setShowInvoice} invoice={selectedInvoice} />
  }

  return (
    <div>
      <div
        className="mb-7 flex cursor-pointer items-center"
        onClick={() => setShowRequest(false)}
      >
        <ChevronLeftIcon className="mr-2.5 h-6 w-5 text-main-600" />
        <span className="text-md font-bold text-main-600">
          Back to my real-estates
        </span>
      </div>

      <div className="mb-8 flex items-center flex-row justify-between space-y-2">
        <Typography variant="body-xl-bold" as="h2" className="text-black">
          Transactions
        </Typography>

        <div className="items-center justify-end space-x-4 flex">
          <Select
            containerClass="py-1 sm:py-3 px-2 sm:px-5 w-full rounded-lg !justify-between"
            values={values}
            selected={selected}
            setSelected={e => setSelected(e)}
          />
        </div>
      </div>
      {invoices.data.length > 0 ? <table className="w-full table-auto text-center">
        <thead>
          {type === "installment" ? (
            <tr className="flex justify-between">
              <th className="text-md flex-1 text-left font-bold text-black">
                Invoice No:
              </th>
              <th className="text-md flex-1 text-center font-bold text-black">
                {selected.name === "paid" ? "Paid On" : "Due on"}
              </th>
              <th className="text-md flex-1 text-right font-bold text-black">
                Amount
              </th>
            </tr>
          ) : (
            <tr className="flex justify-between">
              <th className="text-md flex-1 text-left font-bold text-black">
                {selected.name === "paid" ? "Paid On" : "Due on"}
              </th>
              <th className="text-md flex-1 text-center font-bold text-black">
                Purpose
              </th>
              <th className="text-md flex-1 text-right font-bold text-black">
                Amount
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {type === "installment" ? (
            <>
              {invoices.data.filter(i => i.status === selected.name.toUpperCase()).map((invoice, index) => (
                <tr key={index} className={`flex ${invoice.pdf ? "cursor-pointer" : "cursor-default"} justify-between border-b border-main-100 px-2 py-7 hover:bg-main-100`}
                  onClick={() => handleInvoiceSelection(invoice._id)}>
                  <td className="flex-1 capitalize text-left text-sm font-medium text-black">
                    {invoice?.invoice_no}
                  </td>
                  <td className="flex-1 capitalize text-center text-sm font-medium text-black">
                    {invoice?.status === "PAID" ? format(new Date(invoice?.updatedAt), "dd/MM/yyyy") : format(new Date(invoice?.date), "dd/MM/yyyy")}
                  </td>
                  <td className="flex-1 text-right text-sm font-medium text-main-yellow-500">
                    KWD {Math.abs(invoice?.amount)}
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <>
              {invoices.data.filter(i => i.status === selected.name.toUpperCase()).map((invoice, index) => (
                <tr key={index} className={`flex ${invoice.pdf ? "cursor-pointer" : "cursor-default"} justify-between border-b border-main-100 px-2 py-7 hover:bg-main-100`}
                  onClick={() => handleInvoiceSelection(invoice._id)}>
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
                  <td className="flex-1 text-right text-sm font-medium text-main-yellow-500">
                    KWD {Math.abs(invoice?.amount)}
                  </td>
                </tr>
              ))}
            </>
          )}

        </tbody>
      </table>
        :
        <div className="mt-7 flex items-center justify-center">
          <Typography variant="body-xl-bold" as="h2" className=" text-black">
            No Invoices Yet!
          </Typography>
        </div>
      }
      <div className="mt-7 flex items-center justify-center">
        <Paginator
          lastPage={invoices?.pages}
          page={page}
          onChange={(e) => setPage(e)}
        />
      </div>

    </div>
  );
}

export default Invoices;

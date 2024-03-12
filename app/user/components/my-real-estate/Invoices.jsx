'use client'
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import Typography from "../../../components/Shared/Typography"
import Select from "@/app/components/Shared/Form/Select";
import { axiosClient as axios } from "@/app/services/axiosClient"
import Paginator from "@/app/components/Shared/pagination/Pagination"
import PDFViewer from "./PDFViewer";
import RentsInvoicesTable from "./RentsInvoicesTable"
import InstallmentInvoicesTable from "./InstallmentInvoicesTable"

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

  useEffect(() => {
    console.log(invoices.data.filter(i => i.status === selected.name.toUpperCase()))
  }, [invoices]);

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
      {invoices.data.filter(i => i.status === selected.name.toUpperCase()).length > 0 ?
        <>
          {type === "installment" ?
            <InstallmentInvoicesTable selected={selected} type={type} invoices={invoices} onSelect={invoiceId => handleInvoiceSelection(invoiceId)} />
            :
            <RentsInvoicesTable selected={selected} invoices={invoices} type={type} onSelect={invoiceId => handleInvoiceSelection(invoiceId)} />
          }
        </>
        :
        <div className="mt-7 flex items-center justify-center">
          <Typography variant="body-xl-bold" as="h2" className=" text-black">
            No {selected.icon} Invoices.
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

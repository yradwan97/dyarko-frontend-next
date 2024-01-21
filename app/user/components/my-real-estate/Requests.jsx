'use client'
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Shared/Button"
import Typography from "../../../components/Shared/Typography"
import Select from "@/app/components/Shared/Form/Select";
import { axiosClient as axios } from "@/app/services/axiosClient"
import { format } from "date-fns"
import Paginator from "@/app/components/Shared/pagination/Pagination"
import { capitalizeFirst } from "@/app/utils/utils";
import Input from "../../../components/Shared/Form/Input"
import { toast } from "react-toastify"
import Modal from "../../../components/Shared/Modal"
import DetailedInvoice from "./DetailedInvoice"

const values = [
  { name: "paid", icon: "Paid" },
  { name: "unpaid", icon: "Unpaid" }
];
function Requests({ setShowRequest, id }) {
  const [selected, setSelected] = useState(values[0].name);
  const [page, setPage] = useState(1)
  const [invoices, setInvoices] = useState({ data: [], itemCount: 0, pages: 1 })
  const [showReason, setShowReason] = useState(false)
  const [reason, setReason] = useState("")
  const [showInvoice, setShowInvoice] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState()
  console.log(id)

  const handleInvoiceSelection = (e, invoiceId) => {
    setSelectedInvoice((prevSelectedInvoice) => {
      const selectedInvoice = invoices.data?.find((invoice) => invoice._id === invoiceId);

      if (selectedInvoice) {
        setShowInvoice(true);
      }

      return selectedInvoice;
    });
  };


  const handleTerminateContract = async () => {

    let body = {
      "causes": reason,
      "property": id
    }
    try {
      let response = await axios.post("/end_contract", body)

      if (response.data.success) {
        toast.success("Contract termination request submitted. Pending owner confirmation.")
        setShowRequest(false)
      }
    } catch (e) {
      console.error(e)
      toast.error(`Something went wrong: ${e}`)
    } finally {
      setShowReason(false)
    }
  }

  const getInvoices = async () => {
    try {
      let response = await axios.get(`/invoices?property=${id}&page=${page}`)

      if (response.status === 200) {
        setInvoices(response.data)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getInvoices()
  }, [id, page])

  if (showInvoice) {
    return <DetailedInvoice invoice={selectedInvoice} setShowInvoice={setShowInvoice} />
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

      <div className="mb-8 flex items-center justify-between">
        <Typography variant="body-xl-bold" as="h2" className=" text-black">
          Transactions
        </Typography>
        <div className="hidden items-center justify-end space-x-4 md:flex">
          <Button
            variant="primary"
            onClick={() => setShowReason(true)}
            className="!border-main-orange-500 !bg-main-orange-500 hover:!border-main-orange-600 hover:!bg-main-orange-600 hover:!text-white "
          >
            Terminate Contract
          </Button>
          <Select
            containerClass="py-3 px-5 w-full rounded-lg !justify-between"
            values={values}
            selected={selected}
            setSelected={e => setSelected(e).name}
          />
        </div>
      </div>
      {invoices.data.length > 0 ? <table className="w-full table-auto text-center">
        <thead>
          <tr className="flex justify-between">
            <th className="text-md flex-1 text-left font-bold text-black">
              {selected === "paid" ? "Paid On" : "Due on"}
            </th>
            <th className="text-md flex-1 text-center font-bold text-black">
              Purpose
            </th>
            <th className="text-md flex-1 text-right font-bold text-black">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.data.filter(i => i.status === selected.toUpperCase()).map((invoice, index) => (
            <tr key={index} className="flex justify-between border-b border-main-100 py-7 hover:bg-main-100"
              onClick={(e) => handleInvoiceSelection(e, invoice._id)}>
              <td className="flex-1 text-left text-sm font-medium text-gray-500">
                {format(new Date(invoice?.paid_at), "dd/MM/yyyy HH:mm")}
              </td>
              <td className="flex-1 capitalize text-center text-sm font-medium text-black">
                {invoice?.title} - {capitalizeFirst(invoice?.property[0]?.type)}
              </td>
              <td className="flex-1 text-right text-sm font-medium text-black">
                {Math.abs(invoice?.amount)}
              </td>
            </tr>
          ))}

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
      <Button
        variant="primary"
        onClick={() => setShowReason(true)}
        className="mx-auto mt-4 block !border-main-orange-500 !bg-main-orange-500 hover:!border-main-orange-600 hover:!bg-main-orange-600 hover:!text-white md:hidden"
      >
        Terminate Contract
      </Button>
      <Modal isOpen={showReason} onClose={() => setShowReason(false)}>
        <div className="flex flex-col space-y-3 items-center justify-center">
          <Input type="text" className="text-black" placeholder="Enter Termination Reason." value={reason} onChange={e => setReason(e.target.value)} />
          <div className="flex space-x-2 flex-row">
            <Button variant="primary" onClick={handleTerminateContract}>Submit</Button>
            <Button variant="primary" onClick={() => setShowReason(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Requests;

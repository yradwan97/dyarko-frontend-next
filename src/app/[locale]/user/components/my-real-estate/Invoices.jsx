'use client'
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import Typography from "../../../components/Shared/Typography"
import Select from "@/src/app/[locale]/components/Shared/Form/Select";
import { axiosClient as axios } from "@/src/app/[locale]/services/axiosClient"
import Paginator from "@/src/app/[locale]/components/Shared/pagination/Pagination"
import PDFViewer from "./PDFViewer";
import RentsInvoicesTable from "./RentsInvoicesTable"
import InstallmentInvoicesTable from "./InstallmentInvoicesTable"
import { useTranslations } from "next-intl";

const Invoices = ({ setShowRequest, id, type, selectedPropertyTerminated }) => {
  const tGeneral = useTranslations("General")
  const values = [
    { name: "paid", icon: tGeneral("paid") },
    { name: "unpaid", icon: tGeneral("unpaid") }
  ];
  const [selected, setSelected] = useState(type && type === "installment" ? values[1] : values[0]);
  const t = useTranslations("Account.RealEstates.Invoices")
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
      let endpoint = type === "rent" ? `/invoices?property=${id}&page=${page}` : `/installments_invoices?property=${id}&page=${page}`
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
          {t("back")}
        </span>
      </div>

      {selectedPropertyTerminated.isTerminated ? (
        <div className="w-full space-y-3">
          <Typography variant="body-xl-bold" as="h2" className="text-black text-center">
            {t("terminated")}
          </Typography>
          <Typography variant="body-xl-bold" as="h2" className="text-black text-center">
            {selectedPropertyTerminated.terminationReason}
          </Typography>
        </div>
      ) :
        <>
          <div className="mb-6 grid grid-cols-5">
            <div className="flex col-span-3 items-center justify-center pl-[50%]">
              <Typography variant="body-xl-bold" as="h2" className="text-black text-center">
                {t("transactions")}
              </Typography>
            </div>

            <div className="flex col-span-2 justify-end">
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
                {t("no-invoices")}
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
        </>
      }

    </div>
  );
}

export default Invoices;

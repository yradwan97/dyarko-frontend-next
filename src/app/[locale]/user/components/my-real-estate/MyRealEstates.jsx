'use client'
import React, { useEffect, useState } from "react";
import Typography from "../../../components/Shared/Typography"
import RealEstateProperty from "./RealEstateProperty";
import Invoices from "./Invoices";
import Select from "@/src/app/[locale]/components/Shared/Form/Select";
import { useGetRealEstates } from "../../userApi";
import Paginator from "@/src/app/[locale]/components/Shared/pagination/Pagination"
import Loader from "@/src/app/[locale]/components/Shared/Loader";
import scrollToTop from "@/src/app/[locale]/utils/scrollToTop";
import { useTranslations } from "next-intl";


const MyRealEstates = () => {
  const [showRequest, setShowRequest] = useState(false);
  const [selectedId, setSelectedId] = useState("")
  const [page, setPage] = useState(1)
  const [propertyType, setPropertyType] = useState()
  const [selectedPropertyTerminated, setSelectedPropertyTerminated] = useState({ isTerminated: false, terminationReason: null });
  const t = useTranslations("Account.RealEstates")
  const values = [
    { name: "rents", icon: t("rented"), id: 1 },
    { name: "installments", icon: t("installment"), id: 2 },
  ];
  const [selectedValue, setSelectedValue] = useState(values[0])

  const { data, isLoading, refetch } = useGetRealEstates(`/${selectedValue.name}?page=${page}`)

  useEffect(() => {
    refetch()
  }, [page, refetch, selectedValue])


  const onShowInvoices = (id, type, isTerminatedProperty, terminationReason) => {
    setSelectedId(id)
    setPropertyType(type)
    setSelectedPropertyTerminated({ isTerminated: isTerminatedProperty, terminationReason })
    setTimeout(() => {
      setShowRequest(true)
    }, 500)
  }
  useEffect(() => {
    scrollToTop()
  }, [showRequest])

  return (
    <>
      {isLoading && <Loader />}
      {showRequest ? (
        <Invoices setShowRequest={setShowRequest} type={propertyType} id={selectedId} selectedPropertyTerminated={selectedPropertyTerminated} />
      ) : (
        <>
          <div className="mb-6 flex items-center">
            <div className="w-1/2 flex justify-start">
              <Typography variant="body-xl-bold" as="h2" className="text-black">
                {t("title")}
              </Typography>
            </div>
            <div className="w-1/2 flex justify-end">
              <Select
                containerClass="py-3 px-5 rounded-lg"
                values={values}
                selected={selectedValue}
                setSelected={e => setSelectedValue(e)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {data?.data?.map((f, i) => (
              <RealEstateProperty onShowInvoices={onShowInvoices} key={i} request={f} />
            ))}
          </div>
          <Paginator page={page} lastPage={data?.pages || 1} onChange={e => setPage(e)} />
        </>
      )}
    </>
  );
};

export default MyRealEstates;

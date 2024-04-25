'use client'
import React, { useEffect, useState } from "react";
import Typography from "../../../components/Shared/Typography"
import RealEstateProperty from "./RealEstateProperty";
import Invoices from "./Invoices";
import Select from "@/app/components/Shared/Form/Select";
import { useGetRealEstates } from "../../userApi";
import Paginator from "@/app/components/Shared/pagination/Pagination"
import Loader from "@/app/components/Shared/Loader";
import scrollToTop from "@/app/utils/scrollToTop";

const values = [
  { name: "rents", icon: "Rented", id: 1 },
  { name: "installments", icon: "Installment", id: 2 },
];

const MyRealEstates = () => {
  const [showRequest, setShowRequest] = useState(false);
  const [selectedId, setSelectedId] = useState("")
  const [selectedValue, setSelectedValue] = useState(values[0])
  const [page, setPage] = useState(1)
  const [propertyType, setPropertyType] = useState()
  const [selectedPropertyTerminated, setSelectedPropertyTerminated] = useState({ isTerminated: false, terminationReason: null });

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
                My real-estates <span className="hidden sm:block">{`(${data?.itemsCount !== undefined ? data?.itemsCount : 0})`}</span>
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
              <RealEstateProperty onShowInvoices={onShowInvoices} key={i} property={f.property} contract={f.contract} />
            ))}
          </div>
          <Paginator page={page} lastPage={data?.pages || 1} onChange={e => setPage(e)} />
        </>
      )}
    </>
  );
};

export default MyRealEstates;

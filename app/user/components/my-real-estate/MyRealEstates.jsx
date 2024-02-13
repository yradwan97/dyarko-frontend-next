'use client'
import React, { useEffect, useState } from "react";
import Typography from "../../../components/Shared/Typography"
import RealEstateProperty from "./RealEstateProperty";
import Requests from "./Requests";
import Select from "@/app/components/Shared/Form/Select";
import { useGetRealEstates } from "../../userApi";
import Paginator from "@/app/components/Shared/pagination/Pagination"
import Loader from "@/app/components/Shared/Loader";

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

  const { data, isLoading, refetch } = useGetRealEstates(`/${selectedValue.name}?page=${page}`)
  useEffect(() => {
    refetch()
  }, [page, refetch, selectedValue])



  const onShowInvoices = (id, type) => {
    setSelectedId(id)
    setPropertyType(type)
    setTimeout(() => {
      setShowRequest(true)
    }, 500)
  }


  return (
    <>
      {isLoading && <Loader />}
      {showRequest ? (
        <Requests setShowRequest={setShowRequest} type={propertyType} id={selectedId} />
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
            {data?.data?.map((f, i) => {
              return <RealEstateProperty onShowInvoices={onShowInvoices} key={i} property={f.property} />
            })}
          </div>
          <Paginator page={page} lastPage={data?.pages || 1} onChange={e => setPage(e)} />
        </>
      )}
    </>
  );
};

export default MyRealEstates;

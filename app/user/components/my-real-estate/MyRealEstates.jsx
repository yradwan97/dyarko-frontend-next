'use client'
import React, { useEffect, useState } from "react";
import Button from "../../../components/Shared/Button"
import Typography from "../../../components/Shared/Typography"
import RealEstateProperty from "./RealEstateProperty";
import Requests from "./Requests";
import Select from "@/app/components/Shared/Form/Select";
import { useGetRealEstates } from "../../userApi";
import { useSession } from "next-auth/react";
import Paginator from "@/app/components/Shared/pagination/Pagination"
import Loader from "@/app/components/Shared/Loader";

const values = [
  { name: "rents", icon: "Rented", id: 1 },
  { name: "installments", icon: "Installment", id: 2 },
];

// TODO: Add my real estates from /rents and /installments
// invoices from /invoices?property={propertyId} 

const MyRealEstates = () => {
  const [showRequest, setShowRequest] = useState(false);
  const [selectedId, setSelectedId] = useState("")
  const [selectedValue, setSelectedValue] = useState(values[0].name)
  const [page, setPage] = useState(1)

  const { data, isLoading, refetch } = useGetRealEstates(`/${selectedValue}?page=${page}`)
  useEffect(() => {
    refetch()
  }, [page, selectedValue])

  let filtered = data?.data.filter(d => d?.property !== null)

  const onShowInvoices = (id) => {
    setSelectedId(id)
    setTimeout(() => {
      setShowRequest(true)
    }, 500)
  }


  return (
    <>
      {isLoading && <Loader />}
      {showRequest ? (
        <Requests setShowRequest={setShowRequest} id={selectedId} />
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="body-xl-bold" as="h2" className="text-black">
              My real-estates {(data?.itemsCount) || 0}
            </Typography>
            <Select
              containerClass="py-3 px-5 w-full rounded-lg !justify-between"
              values={values}
              selected={selectedValue}
              setSelected={e => setSelectedValue(e.name)}
            // onTriggerChange={() => setShowRequest(true)}
            />
          </div>
          <div className="flex flex-col gap-4">
            {filtered?.map((f, i) => {
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

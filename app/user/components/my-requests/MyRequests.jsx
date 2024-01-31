import React, { useEffect, useState } from "react";
import Typography from "../../../components/Shared/Typography"
import RequestProperty from "./RequestProperty";
import './tabs.css'
import { useSession } from "next-auth/react";
import { useGetRequests } from "../../userApi";
import Loader from "@/app/components/Shared/Loader";
import Paginator from '@/app/components/Shared/pagination/Pagination'


const MyRequests = ({ installmentRequest }) => {

  const [activeTab, setActiveTab] = useState(1);
  const { data: session } = useSession()
  const [page, setPage] = useState(1)
  const [requests, setRequests] = useState([])

  let endpoint = activeTab === 1 ? `/tours?user=${session?.user?._id}&page=${page}` : `/installments?page=${page}`

  const { data, refetch, isLoading } = useGetRequests(endpoint)

  useEffect(() => {
    setPage(1)
  }, [activeTab])

  useEffect(() => {
    refetch()
  }, [activeTab, page])

  useEffect(() => {
    if (data && data?.data) {
      setRequests(data?.data)
    }
  }, [data])

  useEffect(() => {
    if (installmentRequest) {
      setActiveTab(2)
    }
  }, [installmentRequest])
  useEffect(() => {

    console.log(requests)
  }, [requests])

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  if (isLoading) return <Loader />

  return (
    <>
      <div>
        <Typography variant="body-xl-bold" as="h2" className="mb-6 text-black">
          Your Requests
        </Typography>
        <div className="tabs-container mb-5">
          <div
            className={`tab ${activeTab === 1 && 'active'}`}
            onClick={() => handleTabClick(1)}
          >
            Tours
          </div>
          <div
            className={`tab ${activeTab === 2 && 'active'}`}
            onClick={() => handleTabClick(2)}
          >
            Installments
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {requests.length > 0 ? requests.map((r) => {
            return <RequestProperty key={r?._id} badge={r?.status} request={r} />
          })
            :
            (
              <Typography variant="body-lg-medium" as="h3" className="my-8 text-center text-black">
                No Requests Here Yet!
              </Typography>
            )}
        </div>
      </div>
      {data?.pages > 0 && <Paginator page={page} lastPage={data?.pages || 1} onChange={e => setPage(e)} />}
    </>
  );
};

export default MyRequests;

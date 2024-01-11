import React, { useEffect, useState } from "react";
import Typography from "../../../components/Shared/Typography"
import RequestProperty from "./RequestProperty";
import './tabs.css'
import { useSession } from "next-auth/react";
import { useGetRequests } from "../../userApi";
import Loader from "@/app/components/Shared/Loader";
import Paginator from '@/app/components/Shared/pagination/Pagination'


const MyRequests = () => {

  const [activeTab, setActiveTab] = useState(1);
  const { data: session } = useSession()
  const [page, setPage] = useState(1)

  let endpoint = activeTab === 1 ? `/tours?user=${session?.user?._id}&page=${page}` : `/installments?page=${page}`

  const { data, refetch, isLoading } = useGetRequests(session?.user?.accessToken, endpoint)
  // TODO: remove this filtration when deploying. all requests should have properties
  let filtered = data?.data?.filter(r => r.property !== null) || []

  useEffect(() => {
    setPage(1)
  }, [activeTab])

  useEffect(() => {
    refetch()
  }, [activeTab, page])


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
          {filtered.map((d) => {
            return <RequestProperty key={d?._id} badge={d?.status} property={d?.property} />
          })}
        </div>
      </div>
      <Paginator page={page} lastPage={data?.pages || 1} onChange={e => setPage(e)} />
    </>
  );
};

export default MyRequests;

import React, { useEffect, useState } from "react";
import Typography from "../../../components/Shared/Typography"
import RequestProperty from "./RequestProperty";
import '../tabs.css'
import { useSession } from "next-auth/react";
import { useGetRequests } from "../../userApi";
import Loader from "@/src/app/[locale]/components/Shared/Loader";
import Paginator from '@/src/app/[locale]/components/Shared/pagination/Pagination'
import { useTranslations } from "next-intl";


const MyRequests = ({ request }) => {

  const [activeTab, setActiveTab] = useState(1);
  const { data: session } = useSession()
  const [page, setPage] = useState(1)
  const [requests, setRequests] = useState([])
  const t = useTranslations("Account.Requests")
  let endpoint = activeTab === 1 ? `/tours?user=${session?.user?._id}&page=${page}` : `/installments?page=${page}`

  const { data, refetch, isLoading } = useGetRequests(endpoint)

  useEffect(() => {
    setPage(1)
  }, [activeTab])

  useEffect(() => {
    refetch()
  }, [refetch, activeTab, page])

  useEffect(() => {
    if (data && data?.data) {
      setRequests(data?.data)
    }
  }, [data])

  useEffect(() => {
    if (request) {
      if (request === "tour") {
        setActiveTab(1)
      } else {
        setActiveTab(2)
      }
    }
  }, [request])

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  if (isLoading) return <Loader />

  return (
    <>
      <div>
        <Typography variant="body-xl-bold" as="h2" className="mb-6 text-black">
          {t("title")}
        </Typography>
        <div className="tabs-container mb-5">
          <div
            className={`tab ${activeTab === 1 && 'active'}`}
            onClick={() => handleTabClick(1)}
          >
            {t("tours")}
          </div>
          <div
            className={`tab ${activeTab === 2 && 'active'}`}
            onClick={() => handleTabClick(2)}
          >
            {t("installments")}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {requests.length > 0 ? requests.map((r) => {
            return <RequestProperty activeTab={activeTab} key={r?._id} badge={r?.status} request={r} />
          })
            :
            (
              <Typography variant="body-lg-medium" as="h3" className="my-8 text-center text-black">
                {t("no-requests")}
              </Typography>
            )}
        </div>
      </div>
      {data?.pages > 0 && <Paginator page={page} lastPage={data?.pages || 1} onChange={e => setPage(e)} />}
    </>
  );
};

export default MyRequests;

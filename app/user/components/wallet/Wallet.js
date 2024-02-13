import React, { useEffect, useState } from "react";
import Typography from "../../../components/Shared/Typography"
import { useGetWalletData } from "../../userApi";
import { useSession } from "next-auth/react";
import Paginator from "../../../components/Shared/pagination/Pagination"
import SingleWalletItem from "./SingleWalletItem"
import MainWalletBalance from "./MainWalletBalance"
import Line from "@/app/property-search/components/Line";

const Wallet = () => {
  const {data: session} = useSession()
  const [page, setPage] = useState(1)
  const {data, isSuccess, refetch} = useGetWalletData(session?.user?.accessToken, page)
  
  useEffect(() => {
    refetch()
  }, [page, refetch])

  return isSuccess ? (
    <>
    <Typography variant="h4" as="h4" className="mb-4 text-center text-black">
      Wallet
    </Typography>
      <div className="flex justify-center ">
        <MainWalletBalance user={data?.data[0].user} />
      </div>
        {data?.data?.map((item, index) => {
          return (
            <div key={index}>
              <SingleWalletItem item={item} />
              <Line />
            </div>
          )
        })}
      <Paginator 
        lastPage={data?.pages || 1}
        onChange={(e) => setPage(e)}
        page={page}
      />
    </>
  ) : (
    <Typography variant="h4" as="h4" className="mb-4 text-center text-black">
      No available data
    </Typography>
  );
};

export default Wallet;

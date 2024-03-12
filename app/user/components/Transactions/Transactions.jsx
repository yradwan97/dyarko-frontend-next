import React, { useEffect, useState } from "react";
import Typography from "../../../components/Shared/Typography";
import NoTransaction from "./NoTransactions";
import { useGetTransactions } from "../../userApi";
import { useSession } from "next-auth/react";
import { format } from 'date-fns';
import { capitalizeFirst } from "../../../utils/utils"
import Paginator from "../../../components/Shared/pagination/Pagination"

const Transactions = () => {
  const { data: session } = useSession()
  const [page, setPage] = useState(1)
  const { data, isSuccess, isLoading, refetch } = useGetTransactions(page)

  useEffect(() => {
    if (!data) {
      refetch()
    }
  }, [data, refetch, session])

  useEffect(() => {
    refetch()
  }, [page, refetch])

  return data === null ? (
    <NoTransaction />
  ) : (
    <div>
      <Typography variant="body-xl-bold" as="h2" className="mb-12 text-black">
        Transactions
      </Typography>

      <table className="w-full table-auto text-center">
        <thead>
          <tr className="flex justify-between">
            <th className="text-md flex-1 text-left font-bold text-black">
              Paid In
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
          {data?.data && data?.data.wallet.map((t, i) => {
            return (
              <tr key={i} className="flex justify-between border-b border-main-100 py-7 hover:bg-main-100">
                <td className="flex-1 text-left text-sm font-medium text-gray-500">
                  {format(new Date(t.paid_at), "dd/MM/yyyy hh:mm a")}
                </td>
                <td className="flex-1 text-center text-sm font-medium text-black">
                  {capitalizeFirst(t.title)}
                </td>
                <td className="flex-1 text-right text-sm font-medium text-black">
                  {t.amount}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Paginator onChange={e => setPage(e)} lastPage={data?.data.pages} page={page} />
    </div>
  );
};

export default Transactions;

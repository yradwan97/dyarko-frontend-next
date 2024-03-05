import React, { useEffect, useState } from "react";
import Typography from "../../../components/Shared/Typography";
import Button from "../../../components/Shared/Button";
import { useGetPrizesData, useGetWalletData } from "../../userApi";
import { useSession } from "next-auth/react";
import Paginator from "../../../components/Shared/pagination/Pagination";
import SingleWalletItem from "./SingleWalletItem";
import MainWalletBalance from "./MainWalletBalance";
import Line from "@/app/property-search/components/Line";
import WalletQuestionMark from "../../../components/UI/icons/WalletQuestionMark";
import Modal from "../../../components/Shared/Modal";

const Wallet = () => {
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const [showPrizes, setShowPrizes] = useState(false);
  const { data, isSuccess, refetch } = useGetWalletData(page);
  const {prizes, isSuccess: isPrizesSuccess} = useGetPrizesData()
  useEffect(() => {
    console.log(prizes)
  }, [prizes])

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <>
      {isSuccess ? (
        <>
          <div className="flex flex-row justify-between">
            <div className="w-1/3" />
            <Typography
              variant="h4"
              as="h4"
              className="mb-4 text-center text-black"
            >
              Wallet
            </Typography>
            <div
              className="w-1/3 flex justify-end cursor-pointer"
            >
              {isPrizesSuccess && <WalletQuestionMark setShowPrizes={setShowPrizes} />}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <MainWalletBalance user={data?.data[0].user} />
          </div>
          {data?.data?.map((item, index) => {
            return (
              <div key={index}>
                <SingleWalletItem item={item} />
                <Line />
              </div>
            );
          })}
          <Paginator
            lastPage={data?.pages || 1}
            onChange={(e) => setPage(e)}
            page={page}
          />
        </>
      ) : (
        <Typography
          variant="h4"
          as="h4"
          className="mb-4 text-center text-black"
        >
          No available data
        </Typography>
      )}
      <Modal isOpen={showPrizes} onClose={() => setShowPrizes(false)} className="mt-8">
        <Typography variant="h4" as="h4" className="mb-3 text-black capitalize text-center">
          Prize Packages
        </Typography>
        <div className="m-2 p-2 border rounded-lg overflow-y-auto max-h-44 border-main-500">
          {/* TODO: remove temp packages when static prizes request is fixed */}
          {prizes?.map((p, i) => (
            <React.Fragment key={i}>
            <Typography as="p" variant="p" className="my-2">
              {p}
            </Typography>
            {i !== prizes.length - 1 && <hr/>}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-center">
        <Button variant="primary" onClick={() => setShowPrizes(false)}>
            Ok
        </Button>
        </div>
      </Modal>
    </>
  );
};

export default Wallet;

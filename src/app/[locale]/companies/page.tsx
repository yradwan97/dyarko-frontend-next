"use client";
import React, { Suspense, useEffect, useState } from "react";
import Header from "../components/Shared/Header/Header";
import BackButton from "../components/Shared/BackButton";
import Typography from "../components/Shared/Typography";
import Loader from "../components/Shared/Loader";
import SingleCompany from "./SingleCompany";
import { owner } from "../types/types";
import Link from "next/link";
import Footer from "../components/Shared/Footer/Footer";
import Paginator from "../components/Shared/pagination/Pagination";
import { useGetCompanies } from "./ownersApi";
import { useTranslations } from "next-intl";

const Companies = () => {
  const size = "10";
  const [page, setPage] = useState(1);
  const { isFetching, data, refetch } = useGetCompanies(page.toString(), size);
  const t = useTranslations("Companies");
  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 10);
  }, [page, refetch]);

  if (isFetching) return <Loader />;
  return (
    <Suspense>
      <Header />
      <div className="container pt-8 pb-28">
        <BackButton to="/" />
        <Typography
          variant="h2"
          as="h2"
          className="mb-4 text-[40px] leading-[56px]"
        >
          {t("title")}
        </Typography>
        <Typography
          variant="body-lg-medium"
          as="p"
          className="mb-8 text-main-secondary md:w-1/2 md:text-black"
        >
          {t("desc")}
        </Typography>

        <div className="flex flex-col gap-6">
          {data?.data?.map((owner: owner, index: number) => (
            <Link href={`/company-details/${owner._id}`} key={index}>
              <SingleCompany owner={owner} onTriggerRefetch={() => refetch()} />
            </Link>
          ))}
          <Paginator
            lastPage={data?.pages}
            page={page}
            onChange={(e) => setPage(e)}
          />
        </div>
      </div>
      <Footer />
    </Suspense>
  );
};

export default Companies;

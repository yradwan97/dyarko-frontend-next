import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import Header from "@/src/app/[locale]/components/Shared/Header/Header";
import Loader from "@/src/app/[locale]/components/Shared/Loader";
import Paginator from "@/src/app/[locale]/components/Shared/pagination/Pagination";
import SearchControl from "../search/SearchControl";
import Loading from "./loading";
import { useGetProperties } from "../propertiesApis";
import SingleProperty from "@/src/app/[locale]/landingPage/properties/SingleProperty";
import PropertiesSection from "@/src/app/[locale]/landingPage/properties/PropertiesSection";
import Footer from "@/src/app/[locale]/components/Shared/Footer/Footer";

const defaultFilters = {
  price_from: null,
  price_to: null,
  city: "",
  available_date: null,
  property_type: "",
};

const createApiUrl = (
  page: number,
  slug: string,
  pageSize: number,
  filters: {
    price_from: any;
    price_to: any;
    city: any;
    available_date: any;
    property_type: any;
  },
  searchParameters: ReadonlyURLSearchParams
) => {
  let searchParams = new URLSearchParams();

  searchParams.append("page", page.toString());
  searchParams.append("payment_type", slug);
  searchParams.append("size", pageSize.toString());
  if (filters.price_from) searchParams.append("price_from", filters.price_from);
  if (filters.price_to) searchParams.append("price_to", filters.price_to);
  if (filters.city) {
    searchParams.append("city", filters.city);
  } else if (searchParameters.get("city") !== null) {
    searchParams.append("city", searchParameters.get("city") as string);
  }
  if (filters.property_type) searchParams.append("type", filters.property_type);
  if (filters.available_date)
    searchParams.append("available_date", filters.available_date);

  if (searchParameters.get("category") !== null) {
    searchParams.append("category", searchParameters.get("category") as string);
  }

  return searchParams.toString();
};

const Properties = ({ slug }: any) => {
  const [page, setPage] = useState(1);
  const searchParameters = useSearchParams();
  const pageSize = 6;
  const [filters, setFilters] = useState(defaultFilters);

  const apiSearchParams = createApiUrl(
    page,
    slug,
    pageSize,
    filters,
    searchParameters
  );
  const {
    isLoading,
    data: { data: properties, pages } = {},
    refetch,
  } = useGetProperties(apiSearchParams);

  useEffect(() => {
    // Check if a refetch is needed
    const shouldRefetch =
      !isLoading &&
      refetch &&
      refetch !== null &&
      typeof refetch === "function";
    if (shouldRefetch) {
      refetch();
    }
  }, [page, filters, isLoading, refetch]);

  const handleReset = () => {
    setFilters(defaultFilters);
    setPage(1);
  };

  const handleSearch = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Header />
        <div className="bg-gradient-to-b from-main-100 to-white">
          <div className="container mx-auto py-20">
            <SearchControl
              onReset={handleReset}
              slug={slug}
              onSearch={handleSearch}
            />
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <PropertiesSection
                  properties={properties}
                  propertyClasses={"rounded-lg border-2 border-white p-1"}
                />
                <Paginator
                  lastPage={pages || 1}
                  page={page}
                  onChange={(newPage) => setPage(newPage)}
                />
              </>
            )}
          </div>
        </div>
        <Footer />
      </Suspense>
    </>
  );
};

export default Properties;

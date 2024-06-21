'use client'
import React, { Suspense, useEffect, useState } from "react";
import Button from "../../components/Shared/Button";
import Typography from "../../components/Shared/Typography";
import GridSolid from "../../components/UI/icons/GridSolid"
import ListSolid from "../../components/UI/icons/ListSolid"
import Paginator from "../../components/Shared/pagination/Pagination"
import FilterSection from "./FilterSection";
import SearchSection from "./SearchSection";
import { useGetProperties, useGetPropertyTypes } from "../../property-listing/propertiesApis";
import SingleProperty from "@/src/app/[locale]/landingPage/properties/SingleProperty";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { governerates } from "../../utils/utils";

const sortingValues = [
  { name: "Lowest Price", icon: "Lowest Price", id: 1 },
  { name: "Highest Price", icon: "Highest Price", id: 2 }
];

function SearchPageContent() {
  const searchParams = useSearchParams()
  const [selectedGov, setSelectedGov] = useState(governerates[0])
  const [type, setType] = useState("grid");
  const [finalSearchParams, setFinalSearchParams] = useState(searchParams.toString() || '')
  const [page, setPage] = useState(1)
  const [finalTypes, setFinalTypes] = useState([])
  const { data: session } = useSession()
  const { data: propertyTypes } = useGetPropertyTypes(session?.user?.accessToken)
  const [selectedPropertyType, setSelectedPropertyType] = useState(finalTypes?.length > 0 ? finalTypes[0] : undefined)
  const [priceTo, setPriceTo] = useState("")
  const [selectedSort, setSelectedSort] = useState(sortingValues[0]);
  const [bedrooms, setBedrooms] = useState("")
  const size = 12
  const t = useTranslations("PropertySearch")

  useEffect(() => {

    const mapTypes = () => {
      let final = propertyTypes?.map((type, index) => {
        return {
          id: type.value,
          icon: type.name
        }
      })
      setFinalTypes(final)
    }

    if (propertyTypes?.length > 0) {
      mapTypes()
    }
  }, [propertyTypes])

  useEffect(() => {
    setSelectedPropertyType(finalTypes[0])
  }, [finalTypes])

  useEffect(() => {
    if (searchParams.toString() !== "") {
      if (searchParams.get("city")) {
        setSelectedGov(governerates.find(g => g.id === searchParams.get("city")))
      }
      if (searchParams.get("type") && finalTypes) {
        let selectedType = finalTypes?.find(t => t.id === searchParams.get("type"))
        if (selectedType) {
          setSelectedPropertyType(finalTypes?.find(t => t.id === searchParams.get("type")))
        }
      }
    }
  }, [searchParams, finalTypes])

  const { data: properties, totalCount, refetch } = useGetProperties(`${finalSearchParams.toString()}&page=${page}&size=${size}`)

  const handleSearchParamsChange = (newSearchParams) => {
    const seenKeys = new Set();
    const filteredSearchParams = Object.fromEntries(
      Object.entries(newSearchParams).filter(([key, value]) => {
        // Check for null or empty values and also for duplicate keys
        if (value !== null && value !== "" && !seenKeys.has(key)) {
          seenKeys.add(key); // Add the key to the set to mark it as seen
          return true;
        }
        return false;
      })
    );

    let filteredString = new URLSearchParams(filteredSearchParams).toString()
    let final = [filteredString].join("&")
    setFinalSearchParams(final)
  };

  const handleApplyFilters = () => {
    const searchParams = {
      // bedrooms: bedrooms,
      price_from: priceTo ? 0 : null,
      price_to: priceTo,
      type: selectedPropertyType?.id,
      sort: selectedSort.icon === "Highest Price" ? "price" : "-price",
      city: selectedGov.id
    };

    handleSearchParamsChange(searchParams);
  }

  const onApplyFilters = (extraFilters) => {
    const searchParams = {
      ...extraFilters,
      type: selectedPropertyType?.id,
      sort: selectedSort.icon === "Highest Price" ? "price" : "-price",
      city: selectedGov.id
    };

    handleSearchParamsChange(searchParams);
  }

  useEffect(() => {
    refetch()
  }, [page, finalSearchParams, refetch])


  return (
    <Suspense>
      <div className="flex ">
        <div className="h-full  px-4 py-8 sm:px-8 md:px-12 w-full">
          <Typography variant="h3" as="h3" className="my-4 text-main-blue">
            {t("title")}
          </Typography>
          <Typography
            variant="body-md-medium"
            as="p"
            className="text-main-blue/70"
          >
            {t("total", { count: 1 })}
          </Typography>
          <div className="flex flex-col space-y-4 mt-5 ">
            <div className="w-full lg:w-1/2 flex items-center mr-4">
              <FilterSection governerates={governerates} selectedGov={selectedGov} setSelectedGov={setSelectedGov} onApplyFilters={onApplyFilters} />
            </div>
            <div className="flex flex-row space-x-5 justify-between lg:w-1/2">
              <div className="items-center lg:-translate-y-2 lg:w-1/3 flex ">
                <Button variant="primary" onClick={handleApplyFilters}>Apply Filters</Button>
              </div>
              <div className="items-center lg:w-1/4 lg:-translate-y-2 flex">
                <Button
                  variant="button"
                  className={`group h-10 w-10 rounded-lg border-2 ${type === "grid" ? "border-gray-200" : "border-white"
                    }  flex items-center justify-center`}
                  onClick={() => setType("grid")}
                >
                  <GridSolid
                    className={`h-5 w-5 ${type === "grid" ? " fill-main-600" : " fill-main-secondary"
                      } hover:fill-main-600 `}
                  />
                </Button>
                <Button
                  variant="button"
                  className={`group h-10 w-10 rounded-lg border-2 ${type === "list" ? "border-gray-200" : "border-white"
                    }  flex items-center justify-center`}
                  onClick={() => setType("list")}
                >
                  <ListSolid
                    className={`h-5 w-5 ${type === "list" ? " fill-main-600" : " fill-main-secondary"
                      } hover:fill-main-600 `}
                  />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-right md:space-x-8">
            <div className="lg:w-11/12">
              <SearchSection
                finalTypes={finalTypes}
                selectedPropertyType={selectedPropertyType}
                setSelectedPropertyType={setSelectedPropertyType}
                priceTo={priceTo}
                setPriceTo={setPriceTo}
                // bedrooms={bedrooms}
                // setBedrooms={setBedrooms}
                selectedSort={selectedSort}
                sortingValues={sortingValues}
                setSelectedSort={setSelectedSort}
              />
            </div>
          </div>
          <div className={`mt-8 grid gap-4 ${type === "grid" ? 'sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
            {properties && properties.data.map((property, index) => {
              return (
                <SingleProperty
                  key={index}
                  property={property}
                  listView={type !== "grid"}
                  className={type === "grid"
                    ? "rounded-lg border-2 border-white p-1"
                    : "flex flex-row rounded-lg border-[1.5px]  border-main-100"
                  }
                />
              );
            })}
          </div>
          <Paginator page={page} onChange={(e) => setPage(e)} lastPage={properties?.pages || 1} />
        </div>
      </div>
    </Suspense>
  );
}

export default SearchPageContent;
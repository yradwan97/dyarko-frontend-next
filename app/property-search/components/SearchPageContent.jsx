'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import map from "../../../public/assets/map.png";
import Button from "../../components/Shared/Button";
import Typography from "../../components/Shared/Typography";
import ChevronRight from "../../components/UI/icons/ChevronRight";
import GridSolid from "../../components/UI/icons/GridSolid"
import ListSolid from "../../components/UI/icons/ListSolid"
import Paginator from "../../components/Shared/pagination/Pagination"
import FilterSection from "./FilterSection";
import SearchSection from "./SearchSection";
import { useGetProperties, useGetPropertyTypes } from "../../property-listing/propertiesApis";
import SingleProperty from "@/app/landingPage/properties/SingleProperty";
import { useSearchParams } from "next/navigation";
import { useUrlSearchParams } from "@/app/utils/utils";
import { useSession } from "next-auth/react";

const governerates = [
  { id: "al ahmadi", icon: "Al Ahmadi" },
  { id: "al asimah", icon: "Al-Asimah" },
  { id: "al farwaniyah", icon: "Farwaniya" },
  { id: "hawalli", icon: "Hawalli" },
  { id: "al jahra", icon: "Jahra" },
  { id: "mubarak al-kabeer", icon: "Mubarak Al-Kabeer" },
  { id: "kuwait city", icon: "Kuwait City" }
]

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

  let mapTypes = () => {
    let final = propertyTypes?.map((type, index) => {
      return {
        id: type.value,
        icon: type.name
      }
    })
    setFinalTypes(final)
  }

  useEffect(() => {
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
      if (searchParams.get("type")) {
        let selectedType = finalTypes?.find(t => t.id === searchParams.get("type"))
        console.log("yes", selectedType, searchParams.get("type"), finalTypes)
        if (selectedType) {
          setSelectedPropertyType(finalTypes?.find(t => t.id === searchParams.get("type")))
        }
      }
    }
  }, [searchParams, finalTypes])

  const { data: properties, totalCount, refetch } = useGetProperties(`${finalSearchParams.toString()}&page=${page}`)

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

    console.log(filteredSearchParams['type'])
    let filteredString = new URLSearchParams(filteredSearchParams).toString()
    let final = [filteredString].join("&")
    console.log(final)
    setFinalSearchParams(final)
  };

  useEffect(() => {
    refetch()
  }, [page, finalSearchParams])


  return (
    <div className="flex lg:h-screen">
      <div className="hidden h-full w-5/12 lg:block">
        <Image className="h-full w-full" priority src={map} alt="" />
      </div>
      <div className="h-full overflow-y-scroll px-4 py-8 sm:px-8 md:px-12 lg:w-7/12">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="text-md inline-flex items-center font-medium text-main-secondary hover:text-main-blue"
              >
                Home
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="h-2.5 w-2 stroke-main-secondary" />
                <span className="text-md ml-1 font-medium text-main-blue md:ml-2">
                  Search
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <Typography variant="h3" as="h3" className="my-4 text-main-blue">
          Search properties
        </Typography>
        <Typography
          variant="body-md-medium"
          as="p"
          className="text-main-blue/70"
        >
          {totalCount} properties available to rent
        </Typography>
        <div className="mt-5 flex items-center">
          <FilterSection governerates={governerates} selectedGov={selectedGov} setSelectedGov={setSelectedGov} />
        </div>
        <div className="mt-6 flex flex-col items-right md:space-x-8">

          <div className="hidden items-center md:flex ml-8">
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
          <div className="lg:w-11/12">
            <SearchSection
              onSearchParamsChange={handleSearchParamsChange}
              finalTypes={finalTypes}
              selectedPropertyType={selectedPropertyType}
              setSelectedPropertyType={setSelectedPropertyType}
            />
          </div>
        </div>
        <div className="mt-4 block h-[350px] lg:hidden">
          <Image className="h-full w-full" src={map} alt="" />
        </div>
        <div className={`mt-8 grid gap-4 ${type === "grid" ? 'sm:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-1'}`}>
          {properties && properties.data.map((property, index) => {
            return (
              <SingleProperty
                key={index}
                property={property}
                listView={type !== "grid"}
                className={type === "grid"
                  ? "rounded-lg border-2 border-white p-1 hover:border-main-600"
                  : "flex flex-row rounded-lg border-[1.5px]  border-main-100 hover:border-main-600"
                }
                location={"search"}
              />
            );
          })}
        </div>
        <Paginator page={page} onChange={(e) => setPage(e)} lastPage={properties?.pages || 1} />
      </div>
    </div>
  );
}

export default SearchPageContent;
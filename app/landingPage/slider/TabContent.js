import React, { useEffect, useState } from "react";
import Button from "../../components/Shared/Button";
import Typography from "../../components/Shared/Typography";
import CalenderOutline from "../../components/UI/icons/CalenderOutline"
import DropDownSelect from "@/app/components/Shared/DropDownSelect"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetPropertyTypes } from "@/app/property-listing/propertiesApis";
import Select from "@/app/components/Shared/Form/Select";


const governerates = [
  { id: "al ahmadi", icon: "Al Ahmadi" },
  { id: "al asimah", icon: "Al Asimah" },
  { id: "al farwaniyah", icon: "Al Farwaniya" },
  { id: "hawalli", icon: "Hawalli" },
  { id: "al jahra", icon: "Al Jahra" },
  { id: "mubarak al-kabeer", icon: "Mubarak Al-Kabeer" },
  { id: "kuwait city", icon: "Kuwait City" }
]

 function TabContent({tab, session}) {
   const {data: propertyTypes} = useGetPropertyTypes(session?.user?.accessToken)
  const [date, setDate] = useState("");
  const [selectedGov, setSelectedGov] = useState(governerates[0])
  const [selectedPropertyType, setSelectedPropertyType] = useState(propertyTypes ? propertyTypes[0] : undefined)

  useEffect(() => {
    if (propertyTypes) {
      setSelectedPropertyType(propertyTypes[0])
    }
  }, [propertyTypes])
  
  let queryParams = () => {
    let str = []
    let final = ``
    if (date !== "") str.push(`date=${date}`)
    if (selectedGov) str.push(`location=${selectedGov.id}`)
    if (selectedPropertyType) str.push(`type=${selectedPropertyType?.value}`)
    
    switch (str.length) {
      case 0:
        final = ``
        break;
      case 1:
        final = `?${str[0]}`
        break
      default:
        final = `?${str.join("&")}`
        break;
    }

    return final
  }

  let finalQueryStr = queryParams()


  return (
    <>
      <div className={`flex flex-row ${session ? "w-[960px]" : "w-[800px]"}`}>
        <div className="flex flex-col border-r w-3/5 border-main-200 px-4 lg:px-8">
          <Typography variant="body-sm" as="p" className="mb-1 text-gray-600">
            Location
          </Typography>
          <div className="w-full sm:w-full md:mx-0 ">
            <Select
              containerClass="py-2 px-6 w-full rounded-lg !justify-between"
              values={governerates}
              selected={selectedGov}
              setSelected={(e) => setSelectedGov(e)}
            />

          </div>
        </div>
        <div className="w-5/12 border-r border-main-200 px-2 lg:px-8">
          <Typography variant="body-sm" as="p" className="mb-1 text-gray-600">
            When
          </Typography>
          <div className="relative space-x-2">
            <DatePicker
              className="bg-inherit w-full appearance-none rounded-lg border-0 border-main-200  px-0 text-base 
                  font-bold text-black !placeholder-grey-200 focus:border-main-400 focus-visible:outline-0"
              selected={date === "" ? null : date}
              onChange={(date) => setDate(new Date(date))}
              placeholderText="Select Move-in Date"
            />
            <CalenderOutline className="pointer-events-none absolute bottom-1 right-0 h-4 w-4 stroke-gray-600 " />
          </div>
        </div>
        {session && tab !== "buy" && <div className="w-3/12 border-r border-main-200 px-6 lg:px-8">
          <Typography variant="body-sm" as="p" className="mb-1 text-gray-600">
            Property Type
          </Typography>
          <DropDownSelect
            list={propertyTypes?.map((type) => type.name) || []}
            selectedValue={propertyTypes?.indexOf(selectedPropertyType)}
            onSelect={(indx) => setSelectedPropertyType(propertyTypes[indx])}
          />
        </div>}
        <Button
          variant="primary"
          to={`/property-search${finalQueryStr}`}
          className="ml-4 flex w-4/12 items-center justify-center"
        >
          Browse Properties
        </Button>
      </div>
      {/* <div className="relative md:hidden">
        <Button
          variant="input"
          type="text"
          className="text-md w-full rounded-lg !border-0 !px-0 font-medium placeholder-black"
          placeholder="Search Location"
        />
        <span className="pointer-events-none absolute top-1/2 right-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-lg bg-main-600">
          <SearchOutline className="h-5 w-4 stroke-white text-main-600" />
        </span>
      </div> */}
    </>
  );
}

export default TabContent;

import React, { useEffect, useState } from "react";
import Button from "../../components/Shared/Button";
import Typography from "../../components/Shared/Typography";
import CalenderOutline from "../../components/UI/icons/CalenderOutline"
import DropDownSelect from "@/src/app/[locale]/components/Shared/DropDownSelect"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetPropertyTypes } from "@/src/app/[locale]/property-listing/propertiesApis";
import Select from "@/src/app/[locale]/components/Shared/Form/Select";
import { useTranslations } from "next-intl";


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
  const t = useTranslations("HomePage.Slider.TabsContent")
   const {data: propertyTypes} = useGetPropertyTypes()
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
    str.push(`payment_type=${tab}`)
    if (date !== "") str.push(`date=${date}`)
    if (selectedGov) str.push(`city=${selectedGov.id}`)
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
      <div className={`flex flex-col lg:flex-row w-full space-y-2 h-full ${session ? "md:w-[500px] lg:w-[960px]": "md:w-[500px] lg:w-[800px]"}`}>
        <div className="flex flex-col lg:border-r w-full lg:w-3/5 border-main-200 px-4 lg:px-8">
          <Typography variant="body-md" as="p" className="mb-1 text-gray-600">
            {t("location")}
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
        <div className="lg:w-5/12 w-full lg:border-r border-main-200 px-2 lg:px-8">
          <Typography variant="body-md" as="p" className="mb-1 text-gray-600">
            {t("when")}
          </Typography>
          <div className="relative space-x-2">
            <DatePicker
              className="bg-inherit w-full appearance-none rounded-lg border-0 border-main-200  px-0 text-base 
                  font-bold text-black !placeholder-grey-200 focus:border-main-400 focus-visible:outline-0"
              selected={date === "" ? null : date}
              onChange={(date) => setDate(new Date(date))}
              placeholderText={t("date-placeholder")}
            />
            <CalenderOutline className="pointer-events-none absolute bottom-1 right-0 lg:-right-2 h-4 w-4 stroke-gray-600 " />
          </div>
        </div>
        {session && tab !== "buy" && <div className="lg:w-3/12 lg:border-r w-full border-main-200 px-2 lg:px-8">
          <Typography variant="body-md" as="p" className="mb-1 text-gray-600">
            {t("type")}
          </Typography>
          <DropDownSelect
            list={propertyTypes?.map((type) => type.name) || []}
            selectedValue={propertyTypes?.indexOf(selectedPropertyType)}
            onSelect={(indx) => setSelectedPropertyType(propertyTypes[indx])}
          />
        </div>}
        <div className="lg:w-5/12 w-full px-2">
        <Button
          variant="primary"
          to={`/property-search${finalQueryStr}`}
          className="ml-5 w-[85%] flex lg:w-full md:w-[90%] items-center justify-center"
        >
          {t("browse")}
        </Button>
        </div>
      </div>
    </>
  );
}

export default TabContent;

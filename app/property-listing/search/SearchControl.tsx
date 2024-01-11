import Button from "../../components/Shared/Button";
import Typography from "../../components/Shared/Typography";
import DropDownSelect from "../../components/Shared/DropDownSelect";
import CalenderOutline from "../../components/UI/icons/CalenderOutline";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format as formatCurrency } from "../../utils/utils";
import { useSession } from "next-auth/react";
import { useGetPropertyTypes } from "../propertiesApis";
import Select from "@/app/components/Shared/Form/Select";

const PRICES = [
  {
    priceFrom: 500,
    priceTo: 2500,
  },
  {
    priceFrom: 2500,
    priceTo: 5000,
  },
  {
    priceFrom: 5000,
    priceTo: 10000,
  },
  {
    priceFrom: 10000,
    priceTo: 50000,
  },
];

const getDisplayablePriceRange = (priceRange: typeof PRICES[0]): string => {
  return (
    formatCurrency(priceRange.priceFrom) +
    " - " +
    formatCurrency(priceRange.priceTo)
  );
};

export interface SearchControlProps {
  slug?: string;
  onReset: () => void
  onSearch: (filters: any) => void;
}

type PropertyType = {
  name: string;
  value: string
}

const governerates = [
  { id: "al ahmadi", icon: "Al Ahmadi" },
  { id: "al asimah", icon: "Al-Asimah" },
  { id: "al farwaniyah", icon: "Farwaniya" },
  { id: "hawalli", icon: "Hawalli" },
  { id: "al jahra", icon: "Jahra" },
  // TODO: ask about the spelling and count of all govs.
  { id: "mubarak al-kabeer", icon: "Mubarak Al-Kabeer" }
]

function SearchControl({ slug = "", onSearch, onReset }: SearchControlProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [selectedGov, setSelectedGov] = useState(governerates[0].id)

  const [types, setTypes] = useState<PropertyType[]>([])
  const [priceRange, setPriceRange] = useState(PRICES[0]);
  
  const {data: session} = useSession()
  // @ts-ignore
  const {data: propertyTypes, isSuccess} = useGetPropertyTypes(session?.user?.accessToken)
  const [propertyType, setPropertyType] = useState<PropertyType | undefined>(propertyTypes ? propertyTypes[0] : undefined)

  const handleResetFilters = () => {
    setDate(null)
    setSelectedGov(governerates[0].id)
    setPriceRange(PRICES[0])
    setPropertyType(propertyTypes ? propertyTypes[0] : undefined)

    onReset()
  }

  const handleSearch = () => {
    
    onSearch({
      available_date: date,
      city: selectedGov,
      property_type: propertyType?.value,
      price_to: priceRange.priceTo,
      price_from: priceRange.priceFrom,
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-6 lg:flex-row lg:space-y-0">
        <Typography variant="h2" as="h2" className="text-black">
          Search properties to {slug}
        </Typography>
      </div>
      <div className="mt-8  flex flex-wrap items-center justify-between space-y-6 rounded-lg bg-white py-6 lg:flex lg:space-y-0">
        <div className="flex w-full flex-col gap-y-1 border-main-200 pl-6 pr-4 sm:w-1/2 sm:border-r lg:w-1/2 ">
          <Typography
            variant="body-md-medium"
            className="text-main-secondary "
            as="p"
          >
            Location
          </Typography>
          <Select
              containerClass="py-3 px-5 w-full rounded-lg !justify-between"
              values={governerates}
              selected={selectedGov}
              setSelected={(e) => setSelectedGov(e.id)}
            />
        </div>
        <div className="relative flex w-full flex-col gap-y-1 border-main-200 pl-6 pr-4 sm:w-1/2 md:border-r lg:w-1/2 ">
          <Typography
            variant="body-md-medium"
            as="p"
            className="text-main-secondary"
          >
            When
          </Typography>
          <div className="relative w-full">
            <DatePicker
              className="bg-inherit w-full appearance-none rounded-lg border-0 border-main-200  px-0 text-lg 
                  font-bold text-black placeholder-gray focus:border-main-400 focus-visible:outline-0"
              selected={date}
              onChange={(date: any) => setDate(new Date(date))}
              placeholderText="Select Move-in Date"
            />
            <div className="pointer-events-none absolute bottom-1 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-main-100">
              <CalenderOutline className="h-3 w-3 stroke-main-600" />
            </div>
          </div>
        </div>
        <div className="relative flex w-full flex-col gap-y-1 border-main-200 pl-6 pr-4 sm:w-1/2 sm:border-r lg:w-1/2 ">
          <Typography
            variant="body-md-medium"
            as="p"
            className="text-main-secondary "
          >
            Price
          </Typography>
          <div className="relative w-full">
            <DropDownSelect
              list={PRICES.map((range) => getDisplayablePriceRange(range))}
              onSelect={(indx) => setPriceRange(PRICES[indx])}
            />
          </div>
        </div>
        <div className="relative flex w-full flex-col gap-y-1 border-main-200 pl-6 pr-4 sm:w-1/2 md:border-r lg:w-1/2 ">
        {isSuccess && <>
          <Typography
            variant="body-md-medium"
            as="p"
            className="text-main-secondary"
          >
            Property Type
          </Typography>
          <div className="relative w-full">
            <DropDownSelect
              list={propertyTypes && propertyTypes.map((type: any) => type.name)}
              onSelect={(indx) => setPropertyType(propertyTypes[indx])}
            />
          </div>
          </>
        }
        </div>
        <div className="w-fit px-4 justify-center align-middle pt-1">
          <Button
            variant="primary"
            className="!px-9 text-base font-medium"
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button
            variant="primary-outline"
            className="!px-9 ml-4 text-base font-medium"
            onClick={handleResetFilters}
          >
            Reset
          </Button>
        </div>
      </div>
    </>
  );
}
export default SearchControl;

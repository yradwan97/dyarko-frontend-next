import Button from "../../components/Shared/Button";
import Typography from "../../components/Shared/Typography";
import DropDownSelect from "../../components/Shared/DropDownSelect";
import CalenderOutline from "../../components/UI/icons/CalenderOutline";
import { Suspense, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format as formatCurrency } from "../../utils/utils";
import { useGetPropertyTypes } from "../propertiesApis";
import Select from "@/src/app/[locale]/components/Shared/Form/Select";
import { useSearchParams } from "next/navigation";
import type { PropertyType } from "@/src/app/[locale]/types/types";
import { filterPropertyTypes } from "../../utils/utils";
import { useLocale, useTranslations } from "next-intl";

const PRICES = [
  {
    priceFrom: 0,
    priceTo: 0,
  },
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

export interface SearchControlProps {
  slug?: string;
  onReset: () => void;
  onSearch: (filters: any) => void;
  // searchParams? : ReadonlyURLSearchParams
}

type Governerate = {
  id: string;
  icon: string;
};

const governerates: Governerate[] = [
  { id: "", icon: "All" },
  { id: "al ahmadi", icon: "Al Ahmadi" },
  { id: "al asimah", icon: "Al-Asimah" },
  { id: "al farwaniyah", icon: "Farwaniya" },
  { id: "hawalli", icon: "Hawalli" },
  { id: "al jahra", icon: "Jahra" },
  { id: "mubarak al-kabeer", icon: "Mubarak Al-Kabeer" },
  { id: "kuwait city", icon: "Kuwait City" },
];

function SearchControl({ slug, onSearch, onReset }: SearchControlProps) {
  const locale = useLocale();
  const t = useTranslations("General.PaymentMethods");
  const tSearch = useTranslations("Properties.Listing");
  const [date, setDate] = useState<Date | null>(null);
  const [selectedGov, setSelectedGov] = useState<Governerate>(governerates[0]);
  const [priceRange, setPriceRange] = useState(PRICES[0]);
  const { data: propertyTypes, isSuccess } = useGetPropertyTypes();
  const [propertyType, setPropertyType] = useState<PropertyType>();
  const searchParameters = useSearchParams();
  const [filteredTypes, setFilteredTypes] = useState<
    PropertyType[] | undefined
  >([]);
  const datePickerRef = useRef(null);

  const getDisplayablePriceRange = (priceRange: (typeof PRICES)[0]): string => {
    if (priceRange.priceFrom === 0 && priceRange.priceTo === 0) {
      return tSearch("any-price");
    }
    return (
      formatCurrency(priceRange.priceFrom, locale) +
      " - " +
      formatCurrency(priceRange.priceTo, locale)
    );
  };

  const handleIconClick = () => {
    if (datePickerRef.current) {
      // @ts-ignore
      datePickerRef.current!.setFocus(); // Focus the date picker
    }
  };
  useEffect(() => {
    if (searchParameters.get("city") !== null) {
      let city = searchParameters!.get("city");
      let gov = governerates.find((gov: Governerate) => gov.id === city);
      setSelectedGov(gov!);
    }
  }, [searchParameters]);

  useEffect(() => {
    if (filteredTypes!) {
      setPropertyType(filteredTypes![0]);
    }
  }, [filteredTypes]);

  useEffect(() => {
    if (searchParameters.get("category") !== null) {
      let final = filterPropertyTypes(
        searchParameters.get("category")!,
        propertyTypes
      );
      setFilteredTypes(final);
    } else if (searchParameters.get("category") === null && propertyTypes) {
      setFilteredTypes(propertyTypes);
      setPropertyType(propertyTypes[0]!);
    }
  }, [searchParameters, propertyTypes]);

  const getTitleText = () => {
    switch (slug) {
      case "rent":
        return t("rent");
      case "installment":
        return `${t("buy")} (${t(slug)})`;
      case "cash":
        return `${t("buy")} (${t(slug)})`;
      case "share":
        return t("shared");
      case "replacement":
        return t("replacement");
    }
  };
  const handleResetFilters = () => {
    setDate(null);
    setSelectedGov(governerates[0]);
    setPriceRange(PRICES[0]);
    setPropertyType(filteredTypes![0]);

    onReset();
  };

  return (
    <Suspense>
      <div
        className={`flex flex-col items-center  ${
          locale === "ar" ? "justify-end" : "justify-between"
        } space-y-6 lg:flex-row lg:space-y-0`}
      >
        <Typography variant="h2" as="h2" className={`text-black`}>
          {tSearch("title")} {getTitleText()}
        </Typography>
      </div>
      <div className="flex flex-col">
        <div
          className={`grid grid-cols-1 gap-y-6 py-6 bg-white rounded-lg lg:grid-cols-2 ${
            locale === "ar" ? "text-right" : "text-left"
          }`}
        >
          <div
            className={`flex flex-col gap-y-1 border-main-200 pl-6 pr-4 ${
              locale === "ar" ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <Typography
              variant="body-md-medium"
              className="text-main-secondary"
              as="p"
            >
              {tSearch("location")}
            </Typography>
            <Select
              containerClass="py-3 px-5 w-full rounded-lg !justify-between"
              values={governerates}
              selected={selectedGov}
              setSelected={(e) => setSelectedGov(e)}
            />
          </div>
          <div
            className={`relative flex flex-col gap-y-1 border-main-200 pl-6 pr-4 ${
              locale === "ar" ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <Typography
              variant="body-md-medium"
              as="p"
              className="text-main-secondary"
            >
              {tSearch("when")}
            </Typography>
            <div className="relative w-full rounded-lg outline outline-1 p-3 text-lg font-bold focus:outline-main-400">
              <DatePicker
                ref={datePickerRef}
                className="bg-inherit w-full appearance-none rounded-lg text-lg font-bold text-black placeholder-gray focus-visible:outline-0"
                selected={date}
                onChange={(date: any) => setDate(new Date(date))}
                placeholderText={tSearch("date-placeholder")}
              />
              <div
                onClick={handleIconClick}
                className="cursor-pointer absolute bottom-4 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-main-100"
              >
                <CalenderOutline className="h-3 w-3 stroke-main-600" />
              </div>
            </div>
          </div>
          <div
            className={`relative flex flex-col gap-y-1 border-main-200 pl-6 pr-4 ${
              locale === "ar" ? "lg:order-4" : "lg:order-3"
            }`}
          >
            <Typography
              variant="body-md-medium"
              as="p"
              className="text-main-secondary"
            >
              {tSearch("price")}
            </Typography>
            <div className="relative w-full rounded-lg outline outline-1 p-3 text-lg font-bold focus:outline-main-400">
              <DropDownSelect
                list={PRICES.map((range) => getDisplayablePriceRange(range))}
                onSelect={(indx) => setPriceRange(PRICES[indx])}
              />
            </div>
          </div>
          <div
            className={`relative flex flex-col gap-y-1 border-main-200 pl-6 pr-4 ${
              locale === "ar" ? "lg:order-3" : "lg:order-4"
            }`}
          >
            {isSuccess && (
              <>
                <Typography
                  variant="body-md-medium"
                  as="p"
                  className="text-main-secondary"
                >
                  {tSearch("type")}
                </Typography>
                <div className="relative w-full rounded-lg outline outline-1 p-3 text-lg font-bold focus:outline-main-400">
                  <DropDownSelect
                    list={
                      filteredTypes
                        ? filteredTypes.map((type) => type.name)
                        : []
                    }
                    onSelect={(indx) => setPropertyType(filteredTypes![indx])}
                    selectedValue={
                      filteredTypes ? filteredTypes.indexOf(propertyType!) : 0
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className={`w-full px-6 flex justify-center items-center pt-1 ${
            locale === "ar" ? "lg:justify-end" : "lg:justify-start ml-auto"
          }`}
        >
          <Button
            variant="primary"
            className="!px-9 text-base font-medium"
            onClick={() =>
              onSearch({
                available_date: date,
                city: selectedGov.id,
                property_type: propertyType?.value,
                price_to: priceRange.priceTo,
                price_from: priceRange.priceFrom,
              })
            }
          >
            {tSearch("search")}
          </Button>
          <Button
            variant="primary-outline"
            className="!px-9 ml-4 text-base font-medium"
            onClick={handleResetFilters}
          >
            {tSearch("reset")}
          </Button>
        </div>
      </div>
    </Suspense>
  );
}
export default SearchControl;

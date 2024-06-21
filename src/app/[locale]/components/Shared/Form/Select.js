import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";
import { useTranslations } from "next-intl";

const Select = (props) => {
  const { values, containerClass, selected, setSelected, isGov } = props;
  const t = useTranslations("General.Regions")
  
  return (
    <Listbox value={selected} onChange={(value) => setSelected(value)}>
      <div className="relative">
        <Listbox.Button className={`flex h-full items-center justify-center gap-x-5 border border-gray focus:border-main-yellow-600 ${containerClass || ""}`}>
          <div className="hidden sm:flex">{selected && (isGov ? t(selected.id) : selected.icon)}</div>
          <span className="pointer-events-none">
            <ChevronDownIcon
              className="h-5 w-5 stroke-black sm:stroke-none"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 -translate-10"
          leaveTo="opacity-0 translate-0"
        >
          <Listbox.Options className="absolute top-full -left-10 sm:left-0 right0 p-1 z-10 mt-1 max-h-60 w-[250%] sm:w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-0 ring-black ring-opacity-5 focus:outline-none">
            {values.map((value, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative flex cursor-default select-none items-center rounded-lg py-2 pl-3 pr-4 ${
                    active ? "bg-main-100" : ""
                  }`
                }
                value={value}
              >
                {({ selected }) => (
                  <div className={`${selected ? "font-medium" : "font-normal"}`}>
                    {isGov ? t(value.id) : value.icon}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

Select.propTypes = {
  values: PropTypes.array.isRequired,
  containerClass: PropTypes.string,
  selected: PropTypes.object,
  setSelected: PropTypes.func,
  isGov: PropTypes.bool
};

export default Select;

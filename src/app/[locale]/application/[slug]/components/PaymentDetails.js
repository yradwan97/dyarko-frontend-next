import React, { Fragment, useEffect, useState } from "react";
import {axiosClient as axios} from "../../../services/axiosClient"
import Button from "@/src/app/[locale]/components/Shared/Button";
import Typography from "@/src/app/[locale]/components/Shared/Typography";

import ChevronDown from "@/src/app/[locale]/components/UI/icons/ChevronDown";
import PlusOutline from "@/src/app/[locale]/components/UI/icons/PlusOutline";

import { Listbox, Transition } from "@headlessui/react";
import AddCard from "./AddCard";
import Image from "next/image";
import {useQuery} from "react-query"
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

function PaymentDetails({onChange, titleClass = "mt-16"}) {
  const t = useTranslations("Application.PaymentDetails")
  const [values, setValues] = useState([])
  const [selected, setSelected] = useState();
  const [visible, setVisible] = useState(false);
  const {data: session} = useSession()

  const { data } = useQuery(
    'payment-types',
    async () =>  await axios.get(`/payment_methods`).then(res => {
        if (res.data.success) {
          setValues(res.data.data.filter(m => m.key !== "points"))
        }
      }),
    
    {
        enabled: Boolean(session),
        refetchOnWindowFocus: false,
        refetchOnReconnect: true
    }
  );

  useEffect(() => {
    if (values.length > 0) {
      setSelected(values[0])
    }
  }, [values])

  useEffect(() => {
    if (selected) {
      onChange(selected)
    }
  }, [selected, onChange])
  return (
    <div>
      <Typography variant="h4" as="h4" className={`${titleClass} mb-2 text-black text-center`}>
        {t("title")}
      </Typography>
      <div className="mt-8">
        <Typography variant="h4" as="h4" className={`${titleClass} mb-2 text-black text-center`}>
          {t("subtitle")}
        </Typography>
        <>
            <div className="space-y-4">
              {selected && <Listbox value={selected} onChange={setSelected}>
                <div className="relative w-full">
                  <Listbox.Button
                    className={`relative w-full cursor-default rounded-lg border border-gray-200 py-3 px-7 text-start text-sm font-medium text-main-secondary placeholder-gray-300 outline-0 focus:border-main-yellow-600 `}
                  >
                    <span className={`block truncate `}>{selected?.name}</span>
                    <span
                      className={`pointer-events-none absolute top-1/2 right-4 z-2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-main-100`}
                    >
                      <ChevronDown
                        className="h-2 w-2 stroke-main-600"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      className={`absolute right-0 z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
                    >
                      {values.map((value, i) => (
                        <Listbox.Option
                          key={i}
                          className={({ active }) =>
                            `relative cursor-default select-none py-3 px-6 capitalize ${
                              active
                                ? "bg-main-100 text-main-600"
                                : "text-gray-600"
                            }`
                          }
                          value={value}
                        >
                          {selected && (
                            <>
                              {/* <span
                                        className={`block truncate text-sm font-medium`}
                                    >
                                        {value.name}
                                    </span> */}
                              <div className="flex items-center">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 group-hover:bg-white">
                                  <Image
                                    src={value.logo}
                                    className="w-5"
                                    width={100}
                                    height={100}
                                    alt="master card"
                                  />
                                </span>
                                <Typography
                                  variant="body-sm-bold"
                                  as="h6"
                                  className="text-black group-hover:text-white"
                                >
                                  {value.name}
                                </Typography>
                              </div>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>}
              {/* <Button
                variant="primary-outline"
                className="group flex w-full items-center justify-center space-x-4"
                onClick={() => setVisible(true)}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 group-hover:bg-white">
                  <PlusOutline className="h-3 w-3 stroke-main-600" />
                </span>
                <Typography
                  variant="body-sm-bold"
                  as="h6"
                  className="text-main-600 group-hover:text-white"
                >
                  Add a new card
                </Typography>
              </Button> */}
              
            </div>
           
          </>
      </div>
      <AddCard visible={visible} setVisible={setVisible} />
      
    </div>
  );
}

export default PaymentDetails;

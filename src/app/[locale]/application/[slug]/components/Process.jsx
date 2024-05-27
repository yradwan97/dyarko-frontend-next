import Typography from '@/src/app/[locale]/components/Shared/Typography';
import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo, useState } from 'react'

const Process = ({ step }) => {
  const processNo = useMemo(() => ["renting-information", "terms-and-conditions", "OTP", "payment-option", "payment"], []);
  const [activeProcess, setActiveProcess] = useState(processNo[step - 1]);
  const t = useTranslations("Application.Process")
  useEffect(() => {
    setActiveProcess(processNo[step - 1])
  }, [step, processNo])

  let processes = processNo.map((p, i) => {
    return <span key={i}
      className={`h-[6px] flex-1 rounded-lg capitalize pt-1 ${activeProcess === p ? "bg-main-600" : "bg-main-200"
        } `}>{t(p)}</span>
  })

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Typography
          variant="body-md-bold"
          as="p"
          className="capitalize text-main-600"
        >
          {t(activeProcess)}
        </Typography>
        <Typography variant="body-md-bold" as="p" className="text-gray-200">
          <span className="text-main-600">{step}</span>/{processNo.length}
        </Typography>
      </div>
      <div className="flex items-center">
        {...processes}
      </div>
    </>
  )
}

export default Process
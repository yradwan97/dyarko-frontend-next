import Typography from '@/app/components/Shared/Typography';
import React, { useEffect, useState } from 'react'

const Process = ({ step }) => {
  const processNo = ["renting information", "terms and conditions", "OTP", "payment option", "payment"];
  const [activeProcess, setActiveProcess] = useState(processNo[step - 1]);

  useEffect(() => {
    setActiveProcess(processNo[step - 1])
  }, [step])

  let proccesses = processNo.map((p, i) => {
    return <span key={i}
      className={`h-[6px] flex-1 rounded-lg capitalize pt-1 ${activeProcess === p ? "bg-main-600" : "bg-main-200"
        } `}>{p}</span>
  })

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Typography
          variant="body-md-bold"
          as="p"
          className="capitalize text-main-600"
        >
          {activeProcess}
        </Typography>
        <Typography variant="body-md-bold" as="p" className="text-gray-200">
          <span className="text-main-600">{step}</span>/{processNo.length}
        </Typography>
      </div>
      <div className="flex items-center">
        {...proccesses}
      </div>
    </>
  )
}

export default Process
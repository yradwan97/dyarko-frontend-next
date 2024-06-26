import { capitalizeFirst } from '@/src/app/[locale]/utils/utils';
import React, { useEffect, useState } from 'react';
import { format } from "../../../utils/utils"
import Typography from "../../../components/Shared/Typography"
import { useTranslations } from 'next-intl';

const AvailableServices = ({ property, onChange }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const t = useTranslations("Application.RentingDetails")

  const handleServiceChange = (serviceId) => {
    const updatedServices = selectedServices.includes(serviceId)
      ? selectedServices.filter((id) => id !== serviceId)
      : [...selectedServices, serviceId];

    setSelectedServices(updatedServices);
    onChange(updatedServices);
  };

  return (
    <div className='flex flex-col border p-2 border-main-300 rounded-lg'>
      <div className='flex p-1'>
        <Typography as="h4" variant="body-md">
          {t("services")}
        </Typography>
      </div>
      <div className='flex flex-row'>
        {property?.services.map((service) => (
          < div key={service._id} className="px-2" >
            <label className='p-1'>
              <input
                className='mr-2'
                type="checkbox"
                value={service._id}
                checked={selectedServices.includes(service._id)}
                onChange={() => handleServiceChange(service._id)}
              />
              <span className='font-bold'>{`${capitalizeFirst(service.name)}`}</span> : {format(service.price)}
            </label>
          </div>
        ))
        }
      </div>
    </div >
  );
};

export default AvailableServices;

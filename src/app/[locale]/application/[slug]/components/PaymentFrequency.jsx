import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

const PaymentFrequency = ({ property, onChange, paymentFrequency }) => {
  const [selectedFrequency, setSelectedFrequency] = useState(paymentFrequency);
  const t = useTranslations("Application.RentingDetails.PaymentFrequency")

  useEffect(() => {
    setSelectedFrequency(paymentFrequency)
  }, [paymentFrequency])
  const handleFrequencyChange = (event) => {

    onChange(event.target.value)
    setSelectedFrequency(event.target.value);
  };

  return (
    <div className="border border-main-300 rounded-lg p-4 space-y-1">
      <p className="mb-2">Select payment frequency:</p>

      {property?.is_daily && (
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="daily"
            name="frequency"
            value={`daily`}
            checked={selectedFrequency === `daily`}
            onChange={handleFrequencyChange}
          />
          <label htmlFor="daily" className="text-black">
            {t("daily")}: {t("kwd")}{property?.daily_price}
          </label>
        </div>
      )}

      {property?.is_weekly && (
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="weekly"
            name="frequency"
            value={`weekly`}
            checked={selectedFrequency === `weekly`}
            onChange={handleFrequencyChange}
          />
          <label htmlFor="weekly" className="text-black">
            {t("weekly")}: {t("kwd")}{property?.weekly_price}
          </label>
        </div>
      )}

      {property?.is_monthly && (
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="monthly"
            name="frequency"
            value={`monthly`}
            checked={selectedFrequency === `monthly`}
            onChange={handleFrequencyChange}
          />
          <label htmlFor="monthly" className="text-black">
            {t("monthly")}: {t("kwd")}{property?.monthly_price}
          </label>
        </div>
      )}
    </div>
  );
};

export default PaymentFrequency;

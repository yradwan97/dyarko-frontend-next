import React, { useState, Fragment } from "react";
import Typography from "../../components/Shared/Typography";
import { RadioGroup } from "@headlessui/react";

const plans = ["Any", "1 - 12 months", "13 - 24 months", "24+ months"];
// TODO: remove dummy data
function RentalPeriod() {
  const [plan, setPlan] = useState(plans[0]);

  return (
    <div>
      <Typography variant="body-md-bold" className="mb-3" as="p">
        Rental Period
      </Typography>
      <RadioGroup value={plan} onChange={setPlan}>
        {plans.map((plan) => (
          /* Use the `active` state to conditionally style the active option. */
          /* Use the `checked` state to conditionally style the checked option. */
          <RadioGroup.Option key={plan} value={plan} as={Fragment}>
            {({ active, checked }) => (
              <li className={`mb-5 flex items-center`}>
                <span
                  className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${checked ? " border-main-yellow-600" : "border-gray-200"
                    }`}
                >
                  {checked && (
                    <span className="h-3 w-3 rounded-full bg-main-yellow-600"></span>
                  )}
                </span>
                {plan}
              </li>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
}

export default RentalPeriod;

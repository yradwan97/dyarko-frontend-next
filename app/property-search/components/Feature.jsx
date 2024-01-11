import React from "react";
import Typography from "../../components/Shared/Typography";
import FeatureControl from "./FeatureControl";

function Feature() {
  return (
    <div>
      <Typography variant="body-md-bold" className="mb-3" as="p">
        Features
      </Typography>
      <ul className="space-y-6">
        <li className="flex items-center justify-between">
          <Typography variant="body-md-medium" as="p" className="text-black">
            Bedroom
          </Typography>
          <FeatureControl number={4} />
        </li>
        <li className="flex items-center justify-between">
          <Typography variant="body-md-medium" as="p" className="text-black">
            Bathroom
          </Typography>
          <FeatureControl number={2} />
        </li>
      </ul>
    </div>
  );
}

export default Feature;

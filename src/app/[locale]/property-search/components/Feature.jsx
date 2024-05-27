import React from "react";
import Typography from "../../components/Shared/Typography";
import FeatureControl from "./FeatureControl";

function Feature({ bathrooms, bedrooms, setBathrooms, setBedrooms }) {
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
          <FeatureControl number={bedrooms} setNumber={setBedrooms} />
        </li>
        <li className="flex items-center justify-between">
          <Typography variant="body-md-medium" as="p" className="text-black">
            Bathroom
          </Typography>
          <FeatureControl number={bathrooms} setNumber={setBathrooms} />
        </li>
      </ul>
    </div>
  );
}

export default Feature;

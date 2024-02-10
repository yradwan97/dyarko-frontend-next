import React, { useState } from "react";
import PropTypes from "prop-types";
import PlusOutline from "../../components/UI/icons/PlusOutline";
import MinusOutline from "../../components/UI/icons/MinusOutline";
import Typography from "../../components/Shared/Typography";

function FeatureControl({ number, setNumber }) {

  return (
    <div className="flex items-center space-x-3">
      <span
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-gray-200 hover:bg-main-yellow-600"
        onClick={() =>
          setNumber((number) => (number === 0 ? number : number - 1))
        }
      >
        <MinusOutline className="h-4 w-4 stroke-white" />
      </span>
      <Typography variant="body-md-bold" as="p" className="text-black">
        {number}
      </Typography>
      <span
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-gray-200 hover:bg-main-yellow-600"
        onClick={() => setNumber((number) => number + 1)}
      >
        <PlusOutline className="h-4 w-4 stroke-white" />
      </span>
    </div>
  );
}

FeatureControl.propTypes = {
  number: PropTypes.number.isRequired,
};

export default FeatureControl;

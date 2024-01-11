import React from "react";
import PropTypes from "prop-types";

const RadioGroupIndicator = (props) => {
  const { isChecked, variant } = props;

  const variants = {
    main: "main-600",
    yellow: "main-yellow-600",
  };

  return (
    <div
      className={`flex h-5 w-5 items-center justify-center rounded-full border p-0.5 border-${variants[variant]}`}
    >
      {isChecked ? (
        <div className={`h-3 w-3 rounded-full bg-${variants[variant]}`}></div>
      ) : null}
    </div>
  );
};

RadioGroupIndicator.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default RadioGroupIndicator;

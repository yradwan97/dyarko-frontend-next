import React from "react";
import { Typography } from "../Shared/Typography";
import PropTypes from "prop-types";
import { XCircleIcon } from "@heroicons/react/24/outline";
import CheckCircleIcon from "../UI/icons/CheckCircleIcon";

const Alert = (props) => {
  const { variant, className, children } = props;
  const iconsDefaultClasses = `h-12 w-12 stroke-${variant}`;
  const alertDefaultClasses = `
  my-5 flex items-center gap-4 rounded-lg border border-${variant} p-3 text-${variant}`;
  const alertClasses = `${alertDefaultClasses} ${className || ""}`.trimEnd();

  const iconsVariants = {
    error: <XCircleIcon className={iconsDefaultClasses} />,
    success: <CheckCircleIcon className={iconsDefaultClasses} />,
  };

  return (
    <div className={alertClasses}>
      <div>{iconsVariants[variant]}</div>
      <Typography variant="body-md" as="p">
        {children}
      </Typography>
    </div>
  );
};

Alert.propTypes = {
  variant: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Alert;

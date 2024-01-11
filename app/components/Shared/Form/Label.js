import React from "react";
import PropTypes from "prop-types";
import Typography from "../../Shared/Typography";

const Label = (props) => {
  const { children, htmlFor, className } = props;
  return (
    <label htmlFor={htmlFor} className={`select-none block ${className || ""}`}>
      <Typography variant="body-sm-medium" as="span">
        {children}
      </Typography>
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
};

export default Label;

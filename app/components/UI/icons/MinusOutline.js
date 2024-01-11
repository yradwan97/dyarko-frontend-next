
import React from "react";
import PropTypes from "prop-types";

const MinusOutline = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" className={props.className}>
       <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
  );
};

MinusOutline.propTypes = {
  className: PropTypes.string.isRequired,
};

export default MinusOutline;

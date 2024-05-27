import React from "react";
import PropTypes from "prop-types";

const SortOutline = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
    >
      <path d="M3 7H21"  strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 12H18"  strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 17H14"  strokeWidth="2" strokeLinecap="round"/>

    </svg>
  );
};

SortOutline.propTypes = {
  className: PropTypes.string.isRequired,
};

export default SortOutline;

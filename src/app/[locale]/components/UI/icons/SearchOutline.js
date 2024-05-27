import React from "react";
import PropTypes from "prop-types";

const SearchOutline = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
    >
        <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 22L20 20"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

SearchOutline.propTypes = {
  className: PropTypes.string.isRequired,
};

export default SearchOutline;

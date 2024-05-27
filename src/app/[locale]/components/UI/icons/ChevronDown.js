import React from "react";
import PropTypes from "prop-types";

const ChevronDown = (props) => {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <path d="M1 1.5L8 8.5L15 1.5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

ChevronDown.propTypes = {
  className: PropTypes.string.isRequired,
};

export default ChevronDown;

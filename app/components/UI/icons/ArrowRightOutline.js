
import React from "react";
import PropTypes from "prop-types";

const ArrowRightOutline = (props) => {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <path d="M1.5 1L6.5 6L1.5 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

ArrowRightOutline.propTypes = {
  className: PropTypes.string.isRequired,
};

export default ArrowRightOutline;

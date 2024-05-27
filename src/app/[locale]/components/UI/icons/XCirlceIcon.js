import React from "react";
import PropTypes from "prop-types";

const XCircleIcon = (props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
      <circle cx="12" cy="12" r="11" stroke="black" strokeWidth="2" fill="none" />
      <path d="M7.41421 7.41421L16.5858 16.5858" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.41421 16.5858L16.5858 7.41421" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

XCircleIcon.propTypes = {
  className: PropTypes.string.isRequired,
};

export default XCircleIcon;

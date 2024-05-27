import React from "react";
import PropTypes from "prop-types";

const PlusOutline = (props) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <g clipPath="url(#clip0_2945_4774)">
            <path d="M10 3.33398V16.6673" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.33398 10H16.6673" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
            <clipPath id="clip0_2945_4774">
            <rect width="20" height="20" fill="white"/>
            </clipPath>
        </defs>
    </svg>
  );
};

PlusOutline.propTypes = {
  className: PropTypes.string.isRequired,
};

export default PlusOutline;

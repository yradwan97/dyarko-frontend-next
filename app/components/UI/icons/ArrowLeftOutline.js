import React from "react";
import PropTypes from "prop-types";

const ArrowLeftOutline = (props) => {
  return (
    
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <g clipPath="url(#clip0_3309_33468)">
            <path d="M4.16797 10H15.8346"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.16797 10L9.16797 15"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.16797 10L9.16797 5"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
            <clipPath id="clip0_3309_33468">
            <rect width="20" height="20" fill="white"/>
            </clipPath>
        </defs>
    </svg>
  );
};

ArrowLeftOutline.propTypes = {
  className: PropTypes.string.isRequired,
};

export default ArrowLeftOutline;

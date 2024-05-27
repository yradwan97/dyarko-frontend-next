import React from "react";
import PropTypes from "prop-types";

const PropertyInsuranceOutline = (props) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <g clipPath="url(#clip0_1966_31597)">
            <path d="M6.66667 16H4L16 4L28 16H25.3333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.66602 16V25.3333C6.66602 26.0406 6.94697 26.7189 7.44706 27.219C7.94716 27.719 8.62544 28 9.33268 28H22.666C23.3733 28 24.0515 27.719 24.5516 27.219C25.0517 26.7189 25.3327 26.0406 25.3327 25.3333V16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 18.0007L14.6667 20.6673L20 15.334"  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
            <clipPath id="clip0_1966_31597">
            <rect width="32" height="32" fill="white"/>
            </clipPath>
        </defs>
    </svg>
  );
};

PropertyInsuranceOutline.propTypes = {
  className: PropTypes.string.isRequired,
};

export default PropertyInsuranceOutline;

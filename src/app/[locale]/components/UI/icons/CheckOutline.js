import React from "react";
import PropTypes from "prop-types";

const ApartmentOutline = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
    >
        <g clipPath="url(#clip0_893_12955)">
        <path d="M5 12L10 17L20 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_893_12955">
        <rect width="24" height="24" fill="white"/>
        </clipPath>
        </defs>
    </svg>
  );
};

ApartmentOutline.propTypes = {
  className: PropTypes.string.isRequired,
};

export default ApartmentOutline;

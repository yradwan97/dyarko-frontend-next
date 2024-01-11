import React from "react";
import PropTypes from "prop-types";

const CloseOutline = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
    >
        <g clipPath="url(#clip0_893_12871)">
        <path d="M18 6L6 18" />
        <path d="M6 6L18 18" />
        </g>
        <defs>
        <clipPath id="clip0_893_12871">
        <rect width="24" height="24"/>
        </clipPath>
        </defs>
    </svg>
  );
};

CloseOutline.propTypes = {
  className: PropTypes.string.isRequired,
};

export default CloseOutline;

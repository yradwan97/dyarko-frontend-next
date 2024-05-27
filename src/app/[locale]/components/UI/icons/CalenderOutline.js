import React from "react";
import PropTypes from "prop-types";

const CalenderOutline = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
    >
        <path d="M1.09264 8.40427H18.9166" strokeLinecap="round" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M14.4421 12.3097H14.4513" strokeLinecap="round" strokeWidth="2"  strokeLinejoin="round"/>
        <path d="M10.0046 12.3097H10.0139" strokeLinecap="round" strokeWidth="2"  strokeLinejoin="round"/>
        <path d="M5.55789 12.3097H5.56715" strokeLinecap="round" strokeWidth="2"  strokeLinejoin="round"/>
        <path d="M14.4421 16.1962H14.4513" strokeLinecap="round" strokeWidth="2"  strokeLinejoin="round"/>
        <path d="M10.0046 16.1962H10.0139" strokeLinecap="round" strokeWidth="2"  strokeLinejoin="round"/>
        <path d="M5.55789 16.1962H5.56715" strokeLinecap="round" strokeWidth="2"  strokeLinejoin="round"/>
        <path d="M14.0437 1V4.29078" strokeLinecap="round" strokeWidth="2"  strokeLinejoin="round"/>
        <path d="M5.9655 1V4.29078" strokeLinecap="round" strokeWidth="2"  strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M14.2383 2.57919H5.77096C2.83427 2.57919 1 4.21513 1 7.22222V16.2719C1 19.3262 2.83427 21 5.77096 21H14.229C17.175 21 19 19.3546 19 16.3475V7.22222C19.0092 4.21513 17.1842 2.57919 14.2383 2.57919Z"  strokeLinecap="round" strokeWidth="2"  strokeLinejoin="round"/>
</svg>
  );
};

CalenderOutline.propTypes = {
  className: PropTypes.string.isRequired,
};

export default CalenderOutline;

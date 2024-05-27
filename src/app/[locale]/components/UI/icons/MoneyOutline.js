
import React from "react";
import PropTypes from "prop-types";

const MoneyOutline = (props) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <path d="M14.167 17.0827H5.83366C3.33366 17.0827 1.66699 15.8327 1.66699 12.916V7.08268C1.66699 4.16602 3.33366 2.91602 5.83366 2.91602H14.167C16.667 2.91602 18.3337 4.16602 18.3337 7.08268V12.916C18.3337 15.8327 16.667 17.0827 14.167 17.0827Z"  strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"  strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.58398 7.91602V12.0827"  strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.416 7.91602V12.0827"  strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

MoneyOutline.propTypes = {
  className: PropTypes.string.isRequired,
};

export default MoneyOutline;

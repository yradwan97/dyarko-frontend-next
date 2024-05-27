import React from "react";
import PropTypes from "prop-types";

const HeartSolid = (props) => {
  return (
    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <path d="M1.87869 2.21268C1.60011 2.49125 1.37913 2.82197 1.22836 3.18595C1.0776 3.54993 1 3.94004 1 4.33401C1 4.72798 1.0776 5.11809 1.22836 5.48207C1.37913 5.84605 1.60011 6.17677 1.87869 6.45534L7.00003 11.5767L12.1214 6.45534C12.684 5.89273 13 5.12966 13 4.33401C13 3.53836 12.684 2.77529 12.1214 2.21268C11.5587 1.65006 10.7957 1.33399 10 1.33399C9.20437 1.33399 8.4413 1.65006 7.87869 2.21268L7.00003 3.09134L6.12136 2.21268C5.84278 1.9341 5.51206 1.71312 5.14808 1.56235C4.78411 1.41158 4.39399 1.33398 4.00003 1.33398C3.60606 1.33398 3.21595 1.41158 2.85197 1.56235C2.48799 1.71312 2.15727 1.9341 1.87869 2.21268Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

HeartSolid.propTypes = {
  className: PropTypes.string.isRequired,
};

export default HeartSolid;

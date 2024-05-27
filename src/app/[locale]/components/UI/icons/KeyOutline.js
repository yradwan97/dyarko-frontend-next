import React from "react";
import PropTypes from "prop-types";

const KeyOutline = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
    >
        <path d="M19.79 14.93C17.73 16.98 14.78 17.61 12.19 16.8L7.47999 21.5C7.13999 21.85 6.46999 22.06 5.98999 21.99L3.80999 21.69C3.08999 21.59 2.41999 20.91 2.30999 20.19L2.00999 18.01C1.93999 17.53 2.16999 16.86 2.49999 16.52L7.19999 11.82C6.39999 9.22001 7.01999 6.27001 9.07999 4.22001C12.03 1.27001 16.82 1.27001 19.78 4.22001C22.74 7.17001 22.74 11.98 19.79 14.93Z"  strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.89001 17.49L9.19001 19.79"  strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.5 11C15.3284 11 16 10.3284 16 9.5C16 8.67157 15.3284 8 14.5 8C13.6716 8 13 8.67157 13 9.5C13 10.3284 13.6716 11 14.5 11Z"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

KeyOutline.propTypes = {
  className: PropTypes.string.isRequired,
};

export default KeyOutline;

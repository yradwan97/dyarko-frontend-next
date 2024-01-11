import React from "react";
import PropTypes from "prop-types";

const FileOutline = (props) => {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <path d="M14.5 4.66732V11.334C14.5 13.334 13.5 14.6673 11.1667 14.6673H5.83333C3.5 14.6673 2.5 13.334 2.5 11.334V4.66732C2.5 2.66732 3.5 1.33398 5.83333 1.33398H11.1667C13.5 1.33398 14.5 2.66732 14.5 4.66732Z"  strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.166 3V4.33333C10.166 5.06667 10.766 5.66667 11.4993 5.66667H12.8327"  strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.83398 8.66602H8.50065"  strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.83398 11.334H11.1673"  strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

FileOutline.propTypes = {
  className: PropTypes.string.isRequired,
};

export default FileOutline;

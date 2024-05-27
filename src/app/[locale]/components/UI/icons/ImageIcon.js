import React from "react";
import PropTypes from "prop-types";

const ImageIcon = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <path d="M6.00065 14.6673H10.0007C13.334 14.6673 14.6673 13.334 14.6673 10.0007V6.00065C14.6673 2.66732 13.334 1.33398 10.0007 1.33398H6.00065C2.66732 1.33398 1.33398 2.66732 1.33398 6.00065V10.0007C1.33398 13.334 2.66732 14.6673 6.00065 14.6673Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.99935 6.66667C6.73573 6.66667 7.33268 6.06971 7.33268 5.33333C7.33268 4.59695 6.73573 4 5.99935 4C5.26297 4 4.66602 4.59695 4.66602 5.33333C4.66602 6.06971 5.26297 6.66667 5.99935 6.66667Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.7793 12.633L5.06596 10.4264C5.59263 10.073 6.35263 10.113 6.82596 10.5197L7.04596 10.713C7.56596 11.1597 8.40596 11.1597 8.92596 10.713L11.6993 8.33305C12.2193 7.88638 13.0593 7.88638 13.5793 8.33305L14.666 9.26638"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );
};

ImageIcon.propTypes = {
  className: PropTypes.string.isRequired,
};

export default ImageIcon;

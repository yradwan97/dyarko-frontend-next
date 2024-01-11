
import React from "react";
import PropTypes from "prop-types";

const LinkIcon = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <g clipPath="url(#clip0_2775_5195)">
        <path d="M4 10C5.10457 10 6 9.10457 6 8C6 6.89543 5.10457 6 4 6C2.89543 6 2 6.89543 2 8C2 9.10457 2.89543 10 4 10Z"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6Z"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.80078 7.13385L10.2008 4.86719"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.80078 8.86719L10.2008 11.1339"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_2775_5195">
        <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
    </svg>
  );
};

LinkIcon.propTypes = {
  className: PropTypes.string.isRequired,
};

export default LinkIcon;

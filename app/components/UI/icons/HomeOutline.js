import React from "react";
import PropTypes from "prop-types";

const HomeOutline = props => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <g clipPath="url(#clip0_978_10522)">
            <path d="M5.27778 15H2.5L15 2.5L27.5 15H24.7222"  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.27734 15V24.7222C5.27734 25.4589 5.57 26.1655 6.09094 26.6864C6.61187 27.2073 7.31841 27.5 8.05512 27.5H21.944C22.6807 27.5 23.3873 27.2073 23.9082 26.6864C24.4291 26.1655 24.7218 25.4589 24.7218 24.7222V15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
            <clipPath id="clip0_978_10522">
            <rect width="30" height="30" fill="white"/>
            </clipPath>
        </defs>
    </svg>
  );
};

HomeOutline.propTypes = {
  className: PropTypes.string.isRequired,
};

export default HomeOutline;

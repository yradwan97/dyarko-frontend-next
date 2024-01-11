
import React from "react";
import PropTypes from "prop-types";

const SquareOutline = (props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}
>
        <g clipPath="url(#clip0_893_13218)">
        <path d="M10.5978 18.6524L4.14762 12.2022C3.41753 11.4721 3.41753 10.1278 4.14762 9.39774L10.5978 2.94753C11.3279 2.21744 12.6722 2.21744 13.4023 2.94753L19.8525 9.39774C20.5826 10.1278 20.5826 11.4721 19.8525 12.2022L13.4023 18.6524C12.6722 19.3825 11.3279 19.3825 10.5978 18.6524V18.6524Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.39995 15.806L7.63641 21.0424" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.3635 21.0424L21.6 15.806" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_893_13218">
        <rect width="24" height="24" fill="white"/>
        </clipPath>
        </defs>
    </svg>
  );
};

SquareOutline.propTypes = {
  className: PropTypes.string.isRequired,
};

export default SquareOutline;

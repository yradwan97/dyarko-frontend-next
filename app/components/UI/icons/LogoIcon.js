import React from "react";
import PropTypes from "prop-types";

const LogoIcon = props => {
  return (
    
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <g clipPath="url(#clip0_1931_18424)">
            <path d="M7.50465 1.4495L7.24205 1.28745L6.97947 1.44951L2.36239 4.29914L2.125 4.44566V4.72463V14.0965V14.5965H2.625H2.90386H3.40386V14.0965V5.15898L7.24209 2.79025L11.081 5.159V13.3461H10.3719H9.87191V13.8461V14.125V14.625H10.3719H11.8598H12.3598V14.125V4.72463V4.44564L12.1224 4.29912L7.50465 1.4495Z"/>
        </g>
        <defs>
            <clipPath id="clip0_1931_18424">
            <rect width="14" height="14.2857" fill="white" transform="translate(0 0.857422)"/>
            </clipPath>
        </defs>
    </svg>
  );
};

LogoIcon.propTypes = {
  className: PropTypes.string.isRequired,
};

export default LogoIcon;

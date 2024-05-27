import React from "react";
import PropTypes from "prop-types";

const GridSolid = (props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <g clipPath="url(#clip0_979_14003)">
            <path d="M10 5H6C5.44772 5 5 5.44772 5 6V10C5 10.5523 5.44772 11 6 11H10C10.5523 11 11 10.5523 11 10V6C11 5.44772 10.5523 5 10 5Z" />
            <path d="M18 5H14C13.4477 5 13 5.44772 13 6V10C13 10.5523 13.4477 11 14 11H18C18.5523 11 19 10.5523 19 10V6C19 5.44772 18.5523 5 18 5Z" />
            <path d="M10 13H6C5.44772 13 5 13.4477 5 14V18C5 18.5523 5.44772 19 6 19H10C10.5523 19 11 18.5523 11 18V14C11 13.4477 10.5523 13 10 13Z" />
            <path d="M18 13H14C13.4477 13 13 13.4477 13 14V18C13 18.5523 13.4477 19 14 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 18.5523 13 18 13Z" />
        </g>
        <defs>
            <clipPath id="clip0_979_14003">
                <rect width="24" height="24"/>
            </clipPath>
        </defs>
    </svg>
  );
};

GridSolid.propTypes = {
  className: PropTypes.string.isRequired,
};

export default GridSolid;

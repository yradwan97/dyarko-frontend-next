import React from "react";
import PropTypes from "prop-types";

const ListSolid = (props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <g clipPath="url(#clip0_979_14011)">
            <path d="M18 6H6C4.89543 6 4 6.59695 4 7.33333V8.66667C4 9.40305 4.89543 10 6 10H18C19.1046 10 20 9.40305 20 8.66667V7.33333C20 6.59695 19.1046 6 18 6Z" />
            <path d="M18 14H6C4.89543 14 4 14.597 4 15.3333V16.6667C4 17.403 4.89543 18 6 18H18C19.1046 18 20 17.403 20 16.6667V15.3333C20 14.597 19.1046 14 18 14Z" />
        </g>
        <defs>
            <clipPath id="clip0_979_14011">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
        </defs>
    </svg>
  );
};

ListSolid.propTypes = {
  className: PropTypes.string.isRequired,
};

export default ListSolid;

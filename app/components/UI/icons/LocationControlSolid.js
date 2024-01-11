import React from "react";
import PropTypes from "prop-types";

const LocationControlSolid = (props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
      <g clipPath="url(#clip0_86_2066)">
        <path d="M4 8V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 16V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 11V11.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 18L8.5 13C8.16307 12.391 7.99085 11.7047 8.00037 11.0088C8.00989 10.3129 8.20082 9.63149 8.55428 9.03197C8.90774 8.43245 9.41151 7.93552 10.0158 7.59029C10.6201 7.24506 11.304 7.06348 12 7.06348C12.696 7.06348 13.3799 7.24506 13.9842 7.59029C14.5885 7.93552 15.0923 8.43245 15.4457 9.03197C15.7992 9.63149 15.9901 10.3129 15.9996 11.0088C16.0091 11.7047 15.8369 12.391 15.5 13L12 18Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
          <clipPath id="clip0_86_2066">
          <rect width="24" height="24"/>
          </clipPath>
      </defs>
    </svg>
  );
};

LocationControlSolid.propTypes = {
  className: PropTypes.string.isRequired,
};

export default LocationControlSolid;

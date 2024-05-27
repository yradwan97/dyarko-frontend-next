import React from "react";
import PropTypes from "prop-types";

const BestPriceSolid = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
    >
        <g clipPath="url(#clip0_893_12824)">
        <path d="M5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21L16 19L14 21L12 19L10 21L8 19L5 21Z"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 8.00001H11.5C11.1022 8.00001 10.7206 8.15805 10.4393 8.43935C10.158 8.72065 10 9.10219 10 9.50001C10 9.89784 10.158 10.2794 10.4393 10.5607C10.7206 10.842 11.1022 11 11.5 11H12.5C12.8978 11 13.2794 11.158 13.5607 11.4393C13.842 11.7207 14 12.1022 14 12.5C14 12.8978 13.842 13.2794 13.5607 13.5607C13.2794 13.842 12.8978 14 12.5 14H10M12 14V15.5M12 6.50001V8.00001" stroke="#3DBAEC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_893_12824">
        <rect width="24" height="24" fill="white"/>
        </clipPath>
        </defs>
    </svg>
  );
};

BestPriceSolid.propTypes = {
  className: PropTypes.string.isRequired,
};

export default BestPriceSolid;

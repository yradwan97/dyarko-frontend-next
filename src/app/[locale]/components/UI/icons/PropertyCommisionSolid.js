import React from "react";
import PropTypes from "prop-types";

const PropertyCommisionSolid = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
    >
        <path d="M12 21L22 14H18.01L18 3.00004H6V14H2L12 21Z"  strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 14L15 8.00004" stroke="#3DBAEC" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.5 9.00004C9.77614 9.00004 10 8.77618 10 8.50004C10 8.2239 9.77614 8.00004 9.5 8.00004C9.22386 8.00004 9 8.2239 9 8.50004C9 8.77618 9.22386 9.00004 9.5 9.00004Z" fill="#3DBAEC" stroke="#3DBAEC" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.5 14C14.7761 14 15 13.7762 15 13.5C15 13.2239 14.7761 13 14.5 13C14.2239 13 14 13.2239 14 13.5C14 13.7762 14.2239 14 14.5 14Z" fill="#3DBAEC" stroke="#3DBAEC" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>

    </svg>
  );
};

PropertyCommisionSolid.propTypes = {
  className: PropTypes.string.isRequired,
};

export default PropertyCommisionSolid;

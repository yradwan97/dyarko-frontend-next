
import React from "react";
import PropTypes from "prop-types";

const FacebookSolid = (props) => {
  return (

<svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
   <path d="M9.11938 3.32003H10.9994V0.14003C10.0891 0.045377 9.17453 -0.00135428 8.25938 2.98641e-05C5.53938 2.98641e-05 3.67938 1.66003 3.67938 4.70003V7.32003H0.609375V10.88H3.67938V20H7.35937V10.88H10.4194L10.8794 7.32003H7.35937V5.05003C7.35937 4.00003 7.63938 3.32003 9.11938 3.32003Z"/>
</svg>
  );
};

FacebookSolid.propTypes = {
  className: PropTypes.string.isRequired,
};

export default FacebookSolid;

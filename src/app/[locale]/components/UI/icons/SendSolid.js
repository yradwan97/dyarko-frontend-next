import React from "react";
import PropTypes from "prop-types";

const SendSolid = (props) => {
  return (
    
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <path d="M15.0712 5.51062L6.51124 1.23062C0.76124 -1.64938 -1.59876 0.710623 1.28124 6.46062L2.15124 8.20062C2.40124 8.71062 2.40124 9.30062 2.15124 9.81062L1.28124 11.5406C-1.59876 17.2906 0.75124 19.6506 6.51124 16.7706L15.0712 12.4906C18.9112 10.5706 18.9112 7.43062 15.0712 5.51062ZM11.8412 9.75062H6.44124C6.03124 9.75062 5.69124 9.41062 5.69124 9.00062C5.69124 8.59062 6.03124 8.25062 6.44124 8.25062H11.8412C12.2512 8.25062 12.5912 8.59062 12.5912 9.00062C12.5912 9.41062 12.2512 9.75062 11.8412 9.75062Z"/>
    </svg>

  );
};

SendSolid.propTypes = {
  className: PropTypes.string.isRequired,
};

export default SendSolid;

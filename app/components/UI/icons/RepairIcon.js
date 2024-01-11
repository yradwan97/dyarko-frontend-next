
import React from "react";
import PropTypes from "prop-types";

const RepairIcon = (props) => {
  return (
    
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <g opacity="0.5">
            <path d="M9.5 19.5V18H4.5C3.95 18 3.45 17.78 3.09 17.41C2.72 17.05 2.5 16.55 2.5 16C2.5 14.97 3.3 14.11 4.31 14.01C4.37 14 4.43 14 4.5 14H19.5C19.57 14 19.63 14 19.69 14.01C20.17 14.05 20.59 14.26 20.91 14.59C21.32 14.99 21.54 15.56 21.49 16.18C21.4 17.23 20.45 18 19.39 18H14.5V19.5C14.5 20.88 13.38 22 12 22C10.62 22 9.5 20.88 9.5 19.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.1702 5.3L19.6902 14.01C19.6302 14 19.5702 14 19.5002 14H4.50016C4.43016 14 4.37016 14 4.31016 14.01L3.83016 5.3C3.65016 3.53 5.04016 2 6.81016 2H17.1902C18.9602 2 20.3502 3.53 20.1702 5.3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.99023 2V7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 2V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
    </svg>

  );
};

RepairIcon.propTypes = {
  className: PropTypes.string.isRequired,
};

export default RepairIcon;

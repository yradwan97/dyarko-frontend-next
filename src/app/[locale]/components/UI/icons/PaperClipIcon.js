import React from "react";
import PropTypes from "prop-types";

const PaperClipIcon = props => {
  return (
    
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <path d="M13 6L6.50001 12.5C6.10218 12.8978 5.87869 13.4374 5.87869 14C5.87869 14.5626 6.10218 15.1022 6.50001 15.5C6.89783 15.8978 7.4374 16.1213 8.00001 16.1213C8.56262 16.1213 9.10218 15.8978 9.50001 15.5L16 9C16.7957 8.20435 17.2427 7.12521 17.2427 6C17.2427 4.87478 16.7957 3.79564 16 3C15.2044 2.20435 14.1252 1.75735 13 1.75735C11.8748 1.75735 10.7957 2.20435 10 3L3.50001 9.5C2.30653 10.6935 1.63605 12.3122 1.63605 14C1.63605 15.6878 2.30653 17.3065 3.50001 18.5C4.69348 19.6935 6.31218 20.364 8.00001 20.364C9.68784 20.364 11.3065 19.6935 12.5 18.5L19 12"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

PaperClipIcon.propTypes = {
  className: PropTypes.string.isRequired,
};

export default PaperClipIcon;

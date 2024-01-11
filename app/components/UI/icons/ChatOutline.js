import React from "react";
import PropTypes from "prop-types";

const ChatOutline = (props) => {
  return (
    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.95917 12.6633C1.35083 11.58 1 10.3317 1 9C1 4.8575 4.3575 1.5 8.5 1.5C12.6425 1.5 16 4.8575 16 9C16 13.1425 12.6425 16.5 8.5 16.5C7.16833 16.5 5.92 16.1492 4.83667 15.5408L1 16.5L1.95917 12.6633Z" strokeWidth="1.5882" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

ChatOutline.propTypes = {
  className: PropTypes.string.isRequired,
};

export default ChatOutline;

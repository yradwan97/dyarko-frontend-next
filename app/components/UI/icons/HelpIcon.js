import React from "react";
import PropTypes from "prop-types";

const HelpIcon = (props) => {
  return (
    
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 9.24865C9 8.65227 9.2764 8.08032 9.76838 7.65861C10.2604 7.23691 10.9276 7 11.6234 7H12.373C13.0687 7 13.736 7.23691 14.228 7.65861C14.72 8.08032 14.9964 8.65227 14.9964 9.24865C15.024 9.73529 14.8927 10.2177 14.6223 10.6233C14.352 11.0289 13.9571 11.3356 13.4973 11.4973C13.0375 11.7129 12.6426 12.1219 12.3722 12.6626C12.1019 13.2034 11.9706 13.0971 11.9982 13.7459" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.9982 17.4937V17.5012" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );
};

HelpIcon.propTypes = {
  className: PropTypes.string.isRequired,
};

export default HelpIcon;

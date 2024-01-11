import React from "react";
import PropTypes from "prop-types";

const MessageSolid = props => {
  return (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
    <   path d="M21 0.5H3C1.7595 0.5 0.75 1.5095 0.75 2.75V14.75C0.75 15.9905 1.7595 17 3 17H5.25V20.75C5.25 21.0387 5.41575 21.3005 5.6745 21.4257C5.77875 21.4753 5.88975 21.5 6 21.5C6.16725 21.5 6.333 21.4445 6.46875 21.3358L11.8883 17H21C22.2405 17 23.25 15.9905 23.25 14.75V2.75C23.25 1.5095 22.2405 0.5 21 0.5ZM12 11H6C5.58525 11 5.25 10.664 5.25 10.25C5.25 9.836 5.58525 9.5 6 9.5H12C12.4148 9.5 12.75 9.836 12.75 10.25C12.75 10.664 12.4148 11 12 11ZM18 8H6C5.58525 8 5.25 7.664 5.25 7.25C5.25 6.836 5.58525 6.5 6 6.5H18C18.4147 6.5 18.75 6.836 18.75 7.25C18.75 7.664 18.4147 8 18 8Z"/>
    </svg>
  );
};

MessageSolid.propTypes = {
  className: PropTypes.string.isRequired,
};

export default MessageSolid;

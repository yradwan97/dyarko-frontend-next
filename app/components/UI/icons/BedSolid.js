import React from "react";
import PropTypes from "prop-types";

const BedSolid = (props) => {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <path d="M16.4993 4.98268V2.66602C16.4993 1.29102 15.3743 0.166016 13.9993 0.166016H10.666C10.0243 0.166016 9.44102 0.416016 8.99935 0.816016C8.55768 0.416016 7.97435 0.166016 7.33268 0.166016H3.99935C2.62435 0.166016 1.49935 1.29102 1.49935 2.66602V4.98268C0.991016 5.44102 0.666016 6.09935 0.666016 6.83268V11.8327H2.33268V10.166H15.666V11.8327H17.3327V6.83268C17.3327 6.09935 17.0077 5.44102 16.4993 4.98268ZM10.666 1.83268H13.9993C14.4577 1.83268 14.8327 2.20768 14.8327 2.66602V4.33268H9.83268V2.66602C9.83268 2.20768 10.2077 1.83268 10.666 1.83268ZM3.16602 2.66602C3.16602 2.20768 3.54102 1.83268 3.99935 1.83268H7.33268C7.79102 1.83268 8.16602 2.20768 8.16602 2.66602V4.33268H3.16602V2.66602ZM2.33268 8.49935V6.83268C2.33268 6.37435 2.70768 5.99935 3.16602 5.99935H14.8327C15.291 5.99935 15.666 6.37435 15.666 6.83268V8.49935H2.33268Z"/>
    </svg>
  );
};

BedSolid.propTypes = {
  className: PropTypes.string.isRequired,
};

export default BedSolid;

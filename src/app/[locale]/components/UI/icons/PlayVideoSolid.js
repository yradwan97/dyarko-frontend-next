import React from "react";
import PropTypes from "prop-types";

const PlayVideoSolid = (props) => {
  return (

    <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <path opacity="0.4" d="M31.5 0C14.1033 0 0 14.103 0 31.5C0 48.897 14.1033 63 31.5 63C48.8967 63 63 48.897 63 31.5C63 14.103 48.8967 0 31.5 0ZM42.3872 33.1697L26.6372 43.0135C26.3185 43.2125 25.9561 43.3125 25.5938 43.3125C25.2655 43.3125 24.9367 43.2308 24.6392 43.0654C24.0133 42.7184 23.625 42.0599 23.625 41.3438V21.6562C23.625 20.9401 24.0133 20.2816 24.6392 19.9346C25.265 19.5856 26.0302 19.6068 26.6372 19.9865L42.3872 29.8303C42.9626 30.1908 43.3125 30.8214 43.3125 31.5C43.3125 32.1786 42.9626 32.8093 42.3872 33.1697Z"/>
    </svg>

  );
};

PlayVideoSolid.propTypes = {
  className: PropTypes.string.isRequired,
};

export default PlayVideoSolid;

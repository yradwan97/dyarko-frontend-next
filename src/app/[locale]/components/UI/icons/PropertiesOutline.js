import React from "react";
import PropTypes from "prop-types";

const PropertiesOutline = (props) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <path d="M17.2598 6.5675L11.7046 2.25065C11.217 1.87174 10.617 1.66602 9.99935 1.66602C9.38169 1.66602 8.78165 1.87174 8.29414 2.25065L2.73789 6.5675C2.40398 6.82693 2.13382 7.15917 1.94805 7.53884C1.76228 7.91851 1.66582 8.33558 1.66602 8.75819V16.2513C1.66602 16.8033 1.88551 17.3327 2.27621 17.7231C2.66691 18.1134 3.19681 18.3327 3.74935 18.3327H16.2494C16.8019 18.3327 17.3318 18.1134 17.7225 17.7231C18.1132 17.3327 18.3327 16.8033 18.3327 16.2513V8.75819C18.3327 7.90169 17.9369 7.09306 17.2598 6.5675Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

PropertiesOutline.propTypes = {
  className: PropTypes.string.isRequired,
};

export default PropertiesOutline;

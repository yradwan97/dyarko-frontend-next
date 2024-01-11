import React from "react";
import PropTypes from "prop-types";

const HomeSolid = (props: any) => {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <path d="M5.37885 14.0834C5.38479 14.0814 5.38878 14.0758 5.38878 14.0695V11.7867C5.38878 11.2013 5.85844 10.7267 6.43779 10.7267H8.55561C8.83382 10.7267 9.10064 10.8384 9.29737 11.0372C9.4941 11.236 9.60462 11.5056 9.60462 11.7867V14.08C9.60286 14.3234 9.69731 14.5574 9.86701 14.7301C10.0367 14.9029 10.2676 15 10.5085 15H11.9533C12.6282 15.0018 13.2759 14.7321 13.7537 14.2506C14.2315 13.7691 14.5 13.1152 14.5 12.4334V5.90014C14.5 5.34935 14.2584 4.82688 13.8402 4.4735L8.92507 0.506902C8.07007 -0.188579 6.84503 -0.166123 6.01555 0.560234L1.21254 4.4735C0.774651 4.81646 0.512933 5.34048 0.5 5.90014V12.4267C0.5 13.8479 1.64018 15 3.04665 15H4.45853C4.95535 15 5.35975 14.5978 5.36886 14.0971C5.36897 14.0909 5.37295 14.0853 5.37885 14.0834Z"/>
    </svg>
  );
};

HomeSolid.propTypes = {
  className: PropTypes.string.isRequired,
};

export default HomeSolid;

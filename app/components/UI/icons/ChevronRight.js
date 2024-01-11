import PropTypes from "prop-types";

const ChevronRight = ({ onClick, className, disabled }) => {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      disabled={disabled}>
      <path d="M1.5 1L6.5 6L1.5 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

ChevronRight.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default ChevronRight;

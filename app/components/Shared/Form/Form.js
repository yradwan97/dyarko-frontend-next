import React from "react";
import PropTypes from "prop-types";

const Form = (props) => {
  const { children, formHandleSubmit, submitHandler } = props;
  return <form onSubmit={formHandleSubmit(submitHandler)}>{children}</form>;
};

Form.propTypes = {
  formHandleSubmit: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
};

export default Form;

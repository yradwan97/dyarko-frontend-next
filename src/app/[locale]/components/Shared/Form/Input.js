import React from "react";
import PropTypes from "prop-types";

const Input = (props) => {
  const { id, className, as, register, ...otherAttrs } = props;

  if (as === "textarea")
    return (
      <textarea
        id={id}
        className={`relative block w-full rounded-lg border border-gray-200 py-3 px-5 text-main-secondary text-black outline-none focus:border-main-yellow-600 focus-visible:ring-main-yellow-600 ${
          className || ""
        }`}
        rows="5"
        {...register}
        {...otherAttrs}
      ></textarea>
    );

  return (
    <input
      id={id}
      className={`${className || ""} relative block w-full rounded-lg border border-gray-200 py-3 px-5 text-main-secondary text-black outline-none focus:border-main-yellow-600 focus-visible:ring-main-yellow-600 `}
      {...register}
      {...otherAttrs}
    />
  );
};

Input.propTypes = {
  id: PropTypes.string,
  register: PropTypes.object.isRequired,
};

export default Input;

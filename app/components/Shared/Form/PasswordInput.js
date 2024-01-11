'use client'
import React, {useState} from "react";
import EyeOutline from "../../UI/icons/EyeOutline";
import CloseEyeOutline from "../../UI/icons/CloseEyeOutline"
import Label from "./Label";
import Input from "./Input";
import PropTypes from "prop-types";

function PasswordInput(props) {
  const [switchIcon, setSwitchIcon] = useState(false);
  const {
    containerClass,
    id,
    label,
    className,
    type,
    register,
    error,
    ...otherAttrs
  } = props;

  const isError = !!error;
  const inputClasses = `block w-full border border-gray-200 py-3 text-black px-5 rounded-lg outline-none  ${className ?? ""}`;

  const togglePassClickHandler = () =>
      setSwitchIcon((switchIcon) => !switchIcon);

  return (
      <div className={`mb-4 flex flex-col space-y-2 ${containerClass || ""}`}>
        <Label htmlFor="password">{label || "Password"}</Label>
        <div className={`relative  ${isError ? "focus-visible:border-error border-error" : ""}`}>
          <Input
              id={id}
              className={inputClasses}
              type={switchIcon ? "text" : "password"}
              register={register}
              {...otherAttrs}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-2 flex items-center"
            onClick={togglePassClickHandler}
          >
            {switchIcon ? (
              <EyeOutline className="stroke-gray-400"/>
              ) : (
              <CloseEyeOutline className="stroke-gray-400"/>
            )}
          </button>
        </div>
        {isError && <p className="text-error">{error.message}</p>}
      </div>
  );
}

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,
  error: PropTypes.object,
};

export default PasswordInput;

'use client'
import React, { useState } from "react";
import Label from "./Label";
import Input from "./Input"
import PropTypes from "prop-types";
import { useLocale } from "next-intl";

function InputGroup(props) {
  const [cardIdentity, setCardIdentity] = useState("Upload image");
  const locale = useLocale()
  const {
    containerClass,
    labelClass,
    id,
    label,
    as,
    inputClass,
    register,
    error,
    setIdentity,
    ...otherAttrs
  } = props;

  const isError = !!error;
  const inputClasses = `${
    isError ? "focus-visible:border-error border-error" : ""
  } ${inputClass ?? ""}`;

  return (
    <div className={`mb-4 flex flex-col gap-y-2 ${containerClass ?? ""}`}>
      <Label htmlFor={id} className={`${labelClass} flex ${locale === "ar" && "justify-end"}`}>
        {label}
      </Label>
      {props.type === "file" ? (
        <div className="relative block w-full rounded-lg border border-gray-200 py-3 px-5 placeholder:text-main-secondary text-black outline-none focus:border-main-yellow-600 focus-visible:ring-main-yellow-600 ">
          {cardIdentity}
          <input
            type="file"
            className={`absolute inset-0 opacity-0 ${props.className}`}
            onChange={(e) => {
              setCardIdentity(e.target.value)
              setIdentity(e.target.value !== "")
            }
          }
          />
        </div>
      ) : (
        <Input
          id={id}
          as={as}
          className={`${inputClasses} font-medium placeholder:font-regular text-black placeholder:text-gray-400`}
          register={props.register}
          {...otherAttrs}
        />
      )}

      {isError && <p className="text-error">{error.message}</p>}
    </div>
  );
}

InputGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // register: PropTypes.object.isRequired,
  error: PropTypes.object,
};

export default InputGroup;

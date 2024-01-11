import React from "react";
import PropTypes from "prop-types";
import { RadioGroup } from "@headlessui/react";
import CustomRadioOption from "./CustomRadioOption";

const CustomRadioGroup = (props) => {
  const {
    value,
    setValue,
    list,
    className,
    variant,
    id,
    register,
    error,
    radioClassName,
    hasIndicator,
    ...otherAttrs
  } = props;

  const defaultClasses = "flex flex-wrap gap-3";
  const inputProps = { register, otherAttrs };

  const isError = !!error;

  const getRadioOptions = () => {
    return list.map((item, index) => {
      return (
        <CustomRadioOption
          key={index}
          value={item.value}
          variant={variant || "main"}
          label={item.label}
          Icon={item.icon}
          input={inputProps}
          className={radioClassName}
          hasIndicator={hasIndicator}
        />
      );
    });
  };

  return (
    <div className="my-4 flex flex-col gap-y-2">
      <RadioGroup
        value={value}
        onChange={setValue}
        selected
        className={`${defaultClasses} ${className || ""}`}
      >
        {getRadioOptions()}
      </RadioGroup>
      {isError && <p className="text-error">{error.message}</p>}
    </div>
  );
};

CustomRadioGroup.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(Object).isRequired,
};

export default CustomRadioGroup;

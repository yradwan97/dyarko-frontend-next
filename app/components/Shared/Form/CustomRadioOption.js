import React from "react";
import PropTypes from "prop-types";
import { RadioGroup } from "@headlessui/react";
import Typography from '../Typography'
import Input from "./Input";
import RadioGroupIndicator from './RadioGroupIndicator'

const CONTAINER_GAP = 2;

const CustomRadioOption = (props) => {
  const { value, Icon, label, variant, className, hasIndicator, input } = props;

  const variants = {
    main: {
      checked: "bg-main-100 border-main-600",
      unchecked: "bg-white border-gray-200",
    },
    yellow: {
      checked: "bg-main-yellow-200 border-main-yellow-600",
      unchecked: "bg-main-yellow-300 border-main-yellow-600 opacity-50",
    },
  };

  const defaultClasses = `rounded-xl border-2 flex items-center w-full p-4 gap-${CONTAINER_GAP} cursor-pointer`;

  const getClasses = (checked) => {
    const classes = checked
      ? `${defaultClasses} ${variants[variant].checked}`
      : `${defaultClasses} ${variants[variant].unchecked}`;
    return `${classes}  ${className || ""}`.trimEnd();
  };

  return (
    <RadioGroup.Option value={value}>
      {({ checked }) => (
        <RadioGroup.Label as="label" className={getClasses(checked)}>
          {hasIndicator ? (
            <RadioGroupIndicator isChecked={checked} variant={variant} />
          ) : null}
          <div
            className={`flex flex-col items-center gap-${CONTAINER_GAP} ${
              !hasIndicator ? "flex-1" : ""
            }`}
          >
            {Icon}
            <Typography variant="body-sm-bold" as="span" className="capitalize">
              {label}
            </Typography>
            <Input
              type="radio"
              register={input.register}
              className="hidden"
              value={value}
              {...input.otherAttrs}
            />
          </div>
        </RadioGroup.Label>
      )}
    </RadioGroup.Option>
  );
};

CustomRadioOption.propTypes = {
  value: PropTypes.string.isRequired,
  Icon: PropTypes.object,
  label: PropTypes.string,
  variant: PropTypes.string,
  hasIndicator: PropTypes.bool,
};

export default CustomRadioOption;

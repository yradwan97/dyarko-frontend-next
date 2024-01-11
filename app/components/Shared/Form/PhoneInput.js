import React from "react";
import PropTypes from "prop-types";

import Input from "./Input";
import Label from "./Label";
import Select from "./Select";

const countriesCode = [
  {
    id: 1,
    name: "Durward Reynolds",
    icon: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
          <mask
              id="mask0_2515_2182"
              maskUnits="userSpaceOnUse"
              x="2"
              y="4"
              width="20"
              height="16"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" fill="white"/>
          </mask>
          <g mask="url(#mask0_2515_2182)"></g>
          <g clipPath="url(#clip0_2515_2182)">
            <path
                d="M23.2536 16.1735C23.736 14.8735 24 13.4674 24 11.9996C24 10.5318 23.736 9.1257 23.2536 7.82571L12 6.78223L0.746391 7.82571C0.264047 9.1257 0 10.5318 0 11.9996C0 13.4674 0.264047 14.8735 0.746391 16.1735L12 17.217L23.2536 16.1735Z"
                fill="#F0F0F0"
            />
            <path
                d="M11.9997 23.9999C17.1593 23.9999 21.5578 20.7434 23.2533 16.1738H0.746094C2.44166 20.7434 6.84012 23.9999 11.9997 23.9999Z"
                fill="#D80027"
            />
            <path
                d="M11.9998 0C6.84013 0 2.44166 3.2565 0.746094 7.82611H23.2534C21.5578 3.2565 17.1593 0 11.9998 0Z"
                fill="#6DA544"
            />
            <path
                d="M3.51471 3.51465C-1.17157 8.20093 -1.17157 15.7989 3.51471 20.4853C4.73791 19.2621 5.93182 18.0682 7.82609 16.1739V7.82607L3.51471 3.51465Z"
                fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_2515_2182">
              <rect width="24" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>
    ),
  },
  {
    id: 2,
    name: "Kenton Towne",
    icon: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
          <mask
              id="mask0_2515_2182"
              maskUnits="userSpaceOnUse"
              x="2"
              y="4"
              width="20"
              height="16"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" fill="white"/>
          </mask>
          <g mask="url(#mask0_2515_2182)"></g>
          <g clipPath="url(#clip0_2515_2182)">
            <path
                d="M23.2536 16.1735C23.736 14.8735 24 13.4674 24 11.9996C24 10.5318 23.736 9.1257 23.2536 7.82571L12 6.78223L0.746391 7.82571C0.264047 9.1257 0 10.5318 0 11.9996C0 13.4674 0.264047 14.8735 0.746391 16.1735L12 17.217L23.2536 16.1735Z"
                fill="#F0F0F0"
            />
            <path
                d="M11.9997 23.9999C17.1593 23.9999 21.5578 20.7434 23.2533 16.1738H0.746094C2.44166 20.7434 6.84012 23.9999 11.9997 23.9999Z"
                fill="#D80027"
            />
            <path
                d="M11.9998 0C6.84013 0 2.44166 3.2565 0.746094 7.82611H23.2534C21.5578 3.2565 17.1593 0 11.9998 0Z"
                fill="#6DA544"
            />
            <path
                d="M3.51471 3.51465C-1.17157 8.20093 -1.17157 15.7989 3.51471 20.4853C4.73791 19.2621 5.93182 18.0682 7.82609 16.1739V7.82607L3.51471 3.51465Z"
                fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_2515_2182">
              <rect width="24" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>
    ),
  },
  {
    id: 3,
    name: "Therese Wunsch",
    icon: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
          <mask
              id="mask0_2515_2182"
              maskUnits="userSpaceOnUse"
              x="2"
              y="4"
              width="20"
              height="16"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" fill="white"/>
          </mask>
          <g mask="url(#mask0_2515_2182)"></g>
          <g clipPath="url(#clip0_2515_2182)">
            <path
                d="M23.2536 16.1735C23.736 14.8735 24 13.4674 24 11.9996C24 10.5318 23.736 9.1257 23.2536 7.82571L12 6.78223L0.746391 7.82571C0.264047 9.1257 0 10.5318 0 11.9996C0 13.4674 0.264047 14.8735 0.746391 16.1735L12 17.217L23.2536 16.1735Z"
                fill="#F0F0F0"
            />
            <path
                d="M11.9997 23.9999C17.1593 23.9999 21.5578 20.7434 23.2533 16.1738H0.746094C2.44166 20.7434 6.84012 23.9999 11.9997 23.9999Z"
                fill="#D80027"
            />
            <path
                d="M11.9998 0C6.84013 0 2.44166 3.2565 0.746094 7.82611H23.2534C21.5578 3.2565 17.1593 0 11.9998 0Z"
                fill="#6DA544"
            />
            <path
                d="M3.51471 3.51465C-1.17157 8.20093 -1.17157 15.7989 3.51471 20.4853C4.73791 19.2621 5.93182 18.0682 7.82609 16.1739V7.82607L3.51471 3.51465Z"
                fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_2515_2182">
              <rect width="24" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>
    ),
  },
  {
    id: 4,
    name: "Benedict Kessler",
    icon: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
          <mask
              id="mask0_2515_2182"
              maskUnits="userSpaceOnUse"
              x="2"
              y="4"
              width="20"
              height="16"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" fill="white"/>
          </mask>
          <g mask="url(#mask0_2515_2182)"></g>
          <g clipPath="url(#clip0_2515_2182)">
            <path
                d="M23.2536 16.1735C23.736 14.8735 24 13.4674 24 11.9996C24 10.5318 23.736 9.1257 23.2536 7.82571L12 6.78223L0.746391 7.82571C0.264047 9.1257 0 10.5318 0 11.9996C0 13.4674 0.264047 14.8735 0.746391 16.1735L12 17.217L23.2536 16.1735Z"
                fill="#F0F0F0"
            />
            <path
                d="M11.9997 23.9999C17.1593 23.9999 21.5578 20.7434 23.2533 16.1738H0.746094C2.44166 20.7434 6.84012 23.9999 11.9997 23.9999Z"
                fill="#D80027"
            />
            <path
                d="M11.9998 0C6.84013 0 2.44166 3.2565 0.746094 7.82611H23.2534C21.5578 3.2565 17.1593 0 11.9998 0Z"
                fill="#6DA544"
            />
            <path
                d="M3.51471 3.51465C-1.17157 8.20093 -1.17157 15.7989 3.51471 20.4853C4.73791 19.2621 5.93182 18.0682 7.82609 16.1739V7.82607L3.51471 3.51465Z"
                fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_2515_2182">
              <rect width="24" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>
    ),
  },
  {
    id: 5,
    name: "Katelyn Rohan",
    icon: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
          <mask
              id="mask0_2515_2182"
              maskUnits="userSpaceOnUse"
              x="2"
              y="4"
              width="20"
              height="16"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" fill="white"/>
          </mask>
          <g mask="url(#mask0_2515_2182)"></g>
          <g clipPath="url(#clip0_2515_2182)">
            <path
                d="M23.2536 16.1735C23.736 14.8735 24 13.4674 24 11.9996C24 10.5318 23.736 9.1257 23.2536 7.82571L12 6.78223L0.746391 7.82571C0.264047 9.1257 0 10.5318 0 11.9996C0 13.4674 0.264047 14.8735 0.746391 16.1735L12 17.217L23.2536 16.1735Z"
                fill="#F0F0F0"
            />
            <path
                d="M11.9997 23.9999C17.1593 23.9999 21.5578 20.7434 23.2533 16.1738H0.746094C2.44166 20.7434 6.84012 23.9999 11.9997 23.9999Z"
                fill="#D80027"
            />
            <path
                d="M11.9998 0C6.84013 0 2.44166 3.2565 0.746094 7.82611H23.2534C21.5578 3.2565 17.1593 0 11.9998 0Z"
                fill="#6DA544"
            />
            <path
                d="M3.51471 3.51465C-1.17157 8.20093 -1.17157 15.7989 3.51471 20.4853C4.73791 19.2621 5.93182 18.0682 7.82609 16.1739V7.82607L3.51471 3.51465Z"
                fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_2515_2182">
              <rect width="24" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>
    ),
  },
];

const PhoneInput = React.forwardRef((props, ref) => {
  const {
    containerClass,
    id,
    label,
    className,
    register,
    error,
    ...otherAttrs
  } = props;

  const isError = !!error;
  const inputClasses = `rounded-l-none ${
    isError ? "focus-visible:border-error border-error" : ""
  } ${className ?? ""}`;

  return (
    <div className={`mb-4 flex flex-col space-y-2 ${containerClass ?? ""}`}>
      <Label htmlFor={id}>{label}</Label>
      <div className="flex">
        <Select containerClass="border-gray-200 px-3 rounded-l-lg" values={countriesCode} />
        <Input id={id} className={inputClasses} ref={ref} {...otherAttrs} />
      </div>
      {isError && <p className="text-error">{error.message}</p>}
    </div>
  );
});

PhoneInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,
  error: PropTypes.object,
};

export default PhoneInput;
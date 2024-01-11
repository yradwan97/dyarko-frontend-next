import React from "react";
import PropTypes from "prop-types";
import Typography from "../../components/Shared/Typography";

function Title(props) {
  return (
    <>
      {props.type === "main" ? (
        <>
          <Typography
            variant="h2"
            as="h2"
            className="text-2xl font-bold leading-[44px] text-black sm:text-4xl sm:leading-[56px]"
          >
            {props.head}
          </Typography>
          <Typography variant="body-sm" as="p" className="text-gray-600">
            {props.desc}
          </Typography>
        </>
      ) : props.type === "small-title" ? (
        <>
          <Typography
            variant="h4"
            as="h4"
            className="!text-xl tracking-tight text-black"
          >
            {props.head}
          </Typography>
          <Typography
            variant="body-sm"
            as="p"
            className="leading-6 text-gray-600 "
          >
            {props.desc}
          </Typography>
        </>
      ) : (
        <>
          <Typography
            variant={props.headVariant}
            as="h3"
            className={`${props.headStyle} mb-2 font-bold `}
          >
            {props.head}
          </Typography>
          <Typography
            variant={props.descVariant}
            as="p"
            className={`${props.descStyle}`}
          >
            {props.desc}
          </Typography>
        </>
      )}
    </>
  );
}

Title.propTypes = {
  head: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};
export default Title;

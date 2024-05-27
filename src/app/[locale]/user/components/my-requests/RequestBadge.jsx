import React from "react";
import Typography from "../../../components/Shared/Typography"

function RequestBadge(props) {
  return (
    <div
      className={`${props.bgColor} absolute  bottom-0 right-0 rounded-tl-[16px] rounded-br-lg`}
    >
      <div className="relative flex items-center py-2 px-4">
        <Typography
          variant="body-xs-medium"
          as="p"
          className="flex  items-center capitalize text-white"
        >
          {props.text}
        </Typography>
      </div>
    </div>
  );
}

export default RequestBadge;

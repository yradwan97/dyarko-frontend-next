import React from "react";
import Button from "../../../components/Shared/Button";
import Typography from "../../../components/Shared/Typography";
import CalenderOutline from "../../../components/UI/icons/CalenderOutline";

function TabContent() {
  return (
    <div className="flex">
      <div className=" mr-9 border-r border-main-200 pr-9">
        <Typography variant="body-sm" as="p" className="mb-1 text-gray-600">
          Location
        </Typography>
        <Typography variant="body-md-bold" as="p">
          Barcelona, Spain
        </Typography>
      </div>
      <div className=" mr-9 border-r border-main-200 pr-9">
        <Typography variant="body-sm" as="p" className="mb-1 text-gray-600">
          When
        </Typography>
        <Typography variant="body-md-bold" as="p" className="flex items-center">
          Select Move-in Date
          <CalenderOutline className="ml-3 h-5 w-4 stroke-gray-600" />
        </Typography>
      </div>
      <Button variant="primary" className=" px-7 ">
        Browse Properties
      </Button>
    </div>
  );
}

export default TabContent;

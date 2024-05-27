import React from "react";
import Button from "../../../components/Shared/Button"

function StatusButton() {
  return (
    <div className="absolute bottom-3 right-3">
      <Button
        variant="primary-outline"
        className="!border !border-main-orange-600 !py-1 !font-medium !text-main-orange-600 hover:!bg-white"
      >
        Pay Rent
      </Button>
    </div>
  );
}

export default StatusButton;

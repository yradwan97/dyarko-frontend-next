import React from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import { CheckCircleIcon } from "../icons";
import { Typography } from "../index";
import { XCircleIcon } from "@heroicons/react/24/outline";

const AlertModal = (props) => {
  const { isOpen, onClose, variant, children, className } = props;

  const iconsVariants = {
    success: <CheckCircleIcon className="h-12 w-12 stroke-success" />,
    error: <XCircleIcon className="stroke-error h-12 w-12" />,
  };

  const defaultClasses = "flex flex-col items-center gap-5 text-center";
  const modalClasses = `${defaultClasses} ${className || ""}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={modalClasses}>
      {iconsVariants[variant]}
      <Typography variant="h4" as="p" className="center capitalize">
        {children}
      </Typography>
    </Modal>
  );
};

AlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default AlertModal;

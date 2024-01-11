import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/app/components/Shared/Button";
import Input from "@/app/components/Shared/Form/Input";

const AgreementTerms = ({ property, onContinue }) => {
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [refundPolicy, setRefundPolicy] = useState(false);
  const [contract, setContract] = useState(false);
  const [ownerRules, setOwnerRules] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setSelectAll(
      termsAndConditions &&
      privacyPolicy &&
      refundPolicy &&
      contract &&
      ownerRules
    );
  }, [termsAndConditions, privacyPolicy, refundPolicy, contract, ownerRules]);

  const handleSelectAll = () => {
    const newState = !selectAll;
    setTermsAndConditions(newState);
    setPrivacyPolicy(newState);
    setRefundPolicy(newState);
    setContract(newState);
    setOwnerRules(newState);
  };

  return (
    <div className="flex flex-col items-start mt-8 p-6 border border-gray-200 rounded-lg">
      <div className="flex items-center space-x-2 ">
        <input
          type="checkbox"
          id="termsAndConditions"
          checked={termsAndConditions}
          onChange={() => setTermsAndConditions(!termsAndConditions)}
        />
        <label htmlFor="termsAndConditions">
          <Link href={"/terms-conditions"} legacyBehavior passHref>
            <a target="_blank" rel="noopener noreferrer">
              Terms and Conditions
            </a>
          </Link>
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="privacyPolicy"
          checked={privacyPolicy}
          onChange={() => setPrivacyPolicy(!privacyPolicy)}
        />
        <label htmlFor="privacyPolicy">
          <Link href={"/settings/privacy_policy"} legacyBehavior passHref>
            <a target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
          </Link>
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="refundPolicy"
          checked={refundPolicy}
          onChange={() => setRefundPolicy(!refundPolicy)}
        />
        <label htmlFor="refundPolicy">
          <Link href={"/"} legacyBehavior passHref>
            <a target="_blank" rel="noopener noreferrer">
              Refund Policy
            </a>
          </Link>
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="contract"
          checked={contract}
          onChange={() => setContract(!contract)}
        />
        <label htmlFor="contract">
          <Link href={property?.contract || "/"} legacyBehavior passHref>
            <a target="_blank" rel="noopener noreferrer">
              Contract
            </a>
          </Link>
        </label>
      </div>
      <div className="flex flex-col items-start space-x-2">
        <div className="flex flex-row space-x-2">
          <input
            type="checkbox"
            id="ownerRules"
            checked={ownerRules}
            onChange={() => setOwnerRules(!ownerRules)}
          />
          <label htmlFor="ownerRules">Owner Rules</label>
        </div>
        <Input as="textarea" className="my-2 text-black font-medium">{property?.rules}</Input>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="selectAll"
          checked={selectAll}
          onChange={handleSelectAll}
        />
        <label htmlFor="selectAll">Select All</label>
      </div>
      <Button
        variant="primary"
        className="block w-10/12 mx-auto md:ml-auto md:mr-0 md:w-1/2"
        onClick={onContinue}
        disabled={!selectAll}
      >
        Continue
      </Button>
    </div>
  );
};

export default AgreementTerms;

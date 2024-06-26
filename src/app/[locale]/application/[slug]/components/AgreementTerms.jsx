import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/src/app/[locale]/components/Shared/Button";
import Input from "@/src/app/[locale]/components/Shared/Form/Input";
import { fixRefundUrl } from "@/src/app/[locale]/utils/utils";
import { useTranslations } from "next-intl";

const AgreementTerms = ({ property, onContinue }) => {
  const t = useTranslations("Application.Agreements")
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [contract, setContract] = useState(false);

  const [refundPolicy, setRefundPolicy] = useState(false);
  const [showRefundPolicy, setShowRefundPolicy] = useState(false)

  const [ownerRules, setOwnerRules] = useState(false);
  const [showOwnerRules, setShowOwnerRules] = useState(false)

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

  useEffect(() => {
    setShowRefundPolicy(property && property?.refund_policy !== null)
  }, [property])

  const handleSelectAll = () => {
    const newState = !selectAll;
    setTermsAndConditions(newState);
    setPrivacyPolicy(newState);
    setRefundPolicy(newState);
    setContract(newState);
    setOwnerRules(newState);
  };

  return (
    <div className="flex flex-col items-start mt-8 p-6 border space-y-2 border-gray-200 rounded-lg">
      <div className="w-full">
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
                {t("terms")}
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
            <Link href={"/privacy-policy"} legacyBehavior passHref>
              <a target="_blank" rel="noopener noreferrer">
                {t("privacy")}
              </a>
            </Link>
          </label>
        </div>
        {showRefundPolicy && <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="refundPolicy"
            checked={refundPolicy}
            onChange={() => setRefundPolicy(!refundPolicy)}
          />
          <label htmlFor="refundPolicy">
            <Link href={property?.refund_policy ? property?.refund_policy?.content : "/"} legacyBehavior passHref>
              <a target="_blank" rel="noopener noreferrer">
                {t("refund")}
              </a>
            </Link>
          </label>
        </div>}
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
                {t("contract")}
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
            <label htmlFor="ownerRules" onClick={() => setShowOwnerRules(!showOwnerRules)}>{t("rules")}</label>
          </div>
          {showOwnerRules && <Input as="textarea" value={property?.rules || ""} readOnly className="mt-2 mb-5 !w-1/2 text-black font-medium" />}
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center mt-20 mb-10 space-x-2">
          <input
            type="checkbox"
            id="selectAll"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <label htmlFor="selectAll">{t("all")}</label>
        </div>
        <Button
          variant="primary"
          className="block w-10/12 mx-auto md:ml-auto md:mr-0 md:w-1/2"
          onClick={onContinue}
          disabled={!selectAll}
        >
          {t("continue")}
        </Button>
      </div>
    </div>
  );
};

export default AgreementTerms;

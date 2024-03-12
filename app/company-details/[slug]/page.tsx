import React, { Suspense } from "react";
import CompanyDetailsContent from "../components/CompanyDetailsContent";
import Header from "@/app/components/Shared/Header/Header";
import Footer from "@/app/components/Shared/Footer/Footer";

const CompanyDetails = () => {
  return (
    <>
      <Suspense>
        <Header />
        <CompanyDetailsContent />
        <Footer />
      </Suspense>
    </>
  );
};

export default CompanyDetails;

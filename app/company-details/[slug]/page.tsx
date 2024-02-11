
import { useParams } from 'next/navigation';
import React, { Suspense } from 'react'
import CompanyDetailsContent from "../components/CompanyDetailsContent"
import Header from '@/app/components/Shared/Header/Header';
import Footer from '@/app/components/Shared/Footer/Footer';

const CompanyDetails = () => {
  const { slug } = useParams();
  return (
    <>
      <Header />
        <Suspense>
          <CompanyDetailsContent slug={slug} />
        </Suspense>
      <Footer />
    </>
  )
}

export default CompanyDetails
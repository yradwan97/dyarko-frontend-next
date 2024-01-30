'use client'
import { useParams } from 'next/navigation';
import React from 'react'
import CompanyDetailsContent from "../components/CompanyDetailsContent"
import Header from '@/app/components/Shared/Header/Header';
import Footer from '@/app/components/Shared/Footer/Footer';

const CompanyDetails = () => {
  const { slug } = useParams();
  return (
    <>
      <Header />
      <CompanyDetailsContent slug={slug} />
      <Footer />
    </>
  )
}

export default CompanyDetails
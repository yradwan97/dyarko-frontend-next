'use client'
import { useParams } from 'next/navigation';
import React, { Suspense } from 'react'
import CompanyDetailsContent from "../components/CompanyDetailsContent"
import Header from '@/app/components/Shared/Header/Header';
import Footer from '@/app/components/Shared/Footer/Footer';

const baseUrl = process.env.NEXT_PUBLIC_NEXT_APP_API_URI
export async function generateStaticParams() {
  let companies = await fetch(`${baseUrl}/owners?size=100`).then(res => res.json())

  return companies.map((c: any) => {
    slug: c.slug
  })
}

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
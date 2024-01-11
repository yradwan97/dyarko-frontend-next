'use client'
import React from 'react'
import Header from '../../components/Shared/Header/Header'
import Footer from '../../components/Shared/Footer/Footer'
import ApplicationContents from "./components/ApplicationContents"
import { useParams } from 'next/navigation'

const Application = () => {
  const {slug} = useParams()
  return (
    <>
        <Header />
          <ApplicationContents id={slug} />
        <Footer />
    </>
  )
}

export default Application
'use client'
import React, { useEffect } from 'react'
import Header from '../../components/Shared/Header/Header'
import Footer from '../../components/Shared/Footer/Footer'
import ApplicationContents from "./components/ApplicationContents"
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Application = () => {
  const {slug} = useParams()
  const {data: session} = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session === undefined) {
      router.push("/")
    }
  }, [session])
  return (
    <>
        <Header />
          <ApplicationContents id={slug} />
        <Footer />
    </>
  )
}

export default Application
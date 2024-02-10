'use client'
import React, { useEffect } from 'react'
import Header from '../components/Shared/Header/Header'
import Footer from '../components/Shared/Footer/Footer'
import ApplicationContents from "./components/ApplicationContents"
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Application = () => {
  const searchParams = useSearchParams()
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
          <ApplicationContents id={searchParams.get("id")!} />
        <Footer />
    </>
  )
}

export default Application
'use client'
import React from 'react'
import { useState } from 'react'
import SingleProperty from "../../../landingPage/properties/SingleProperty"
import NoSavedProperties from './NoSavedProperties'
import Typography from "../../../components/Shared/Typography"
import { useGetSavedProperties } from '../../userApi'
import { useSession } from 'next-auth/react'

const SavedProperties = () => {
  const { data: session } = useSession()
  const { data, isSuccess } = useGetSavedProperties()

  return (
    <div>
      <Typography variant="h3" as="h3" className="mb-9 text-black">
        Saved Properties
      </Typography>
      {data?.length > 0 ? (
        <div className="md:gab-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {data.map((p, i) => {
            return <SingleProperty key={i} property={p?.property} location={"savedProperties"} />
          })}
        </div>
      ) : (
        <NoSavedProperties />
      )}
    </div>
  )
}

export default SavedProperties
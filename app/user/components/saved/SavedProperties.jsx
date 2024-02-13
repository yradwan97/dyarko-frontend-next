'use client'
import React, { useEffect, useState } from 'react'
import Paginator from "@/app/components/Shared/pagination/Pagination"
import SingleProperty from "../../../landingPage/properties/SingleProperty"
import NoSavedProperties from './NoSavedProperties'
import Typography from "../../../components/Shared/Typography"
import { useGetSavedProperties } from '../../userApi'

const SavedProperties = () => {
  const [page, setPage] = useState(1)
  const { data, pages, itemsCount, refetch } = useGetSavedProperties(page)

  const onTriggerRefetch = () => {
    refetch()
  }

  useEffect(() => {
    onTriggerRefetch()
  }, [page])

  return (
    <div>
      <Typography variant="h3" as="h3" className="mb-9 text-black">
        Saved Properties <span className="hidden sm:block">{`(${itemsCount !== undefined ? itemsCount : 0})`}</span>
      </Typography>
      {data?.length > 0 ? (
        <div className="md:gap-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((p, i) => {
            return (
              <SingleProperty
                key={i}
                property={p?.property}
                location={"savedProperties"}
                onTriggerRefetch={onTriggerRefetch}
              />
            )
          })}
          <Paginator page={page} lastPage={pages} onChange={(e) => setPage(e)} />
        </div>
      ) : (
        <NoSavedProperties />
      )}
    </div>
  )
}

export default SavedProperties
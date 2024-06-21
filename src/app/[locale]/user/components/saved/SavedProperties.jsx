'use client'
import React, { useEffect, useState } from 'react'
import Paginator from "@/src/app/[locale]/components/Shared/pagination/Pagination"
import SingleProperty from "../../../landingPage/properties/SingleProperty"
import NoSavedProperties from './NoSavedProperties'
import Typography from "../../../components/Shared/Typography"
import { useGetSavedProperties } from '../../userApi'
import { useTranslations } from 'next-intl'

const SavedProperties = () => {
  const [page, setPage] = useState(1)
  const { data, pages, itemsCount, refetch } = useGetSavedProperties(page)
  const t = useTranslations("Account.SavedProperties")
  const onTriggerRefetch = () => {
    refetch()
  }

  useEffect(() => {
    onTriggerRefetch()
  }, [page])

  return (
    <div>
      <Typography variant="h3" as="h3" className="mb-9 text-black text-center">
        {t("title")}
      </Typography>
      {data?.length > 0 ? (
        <>
          <div className="md:gap-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((p, i) => {
              return (
                <SingleProperty
                  key={i}
                  property={p?.property}
                  location={"savedProperties"}
                  onTriggerRefetch={onTriggerRefetch}
                  className={"rounded-lg border-2 border-white p-1"}
                />
              )
            })}
          </div>
          <Paginator page={page} lastPage={pages} onChange={(e) => setPage(e)} />
        </>
      ) : (
        <NoSavedProperties />
      )}
    </div>
  )
}

export default SavedProperties
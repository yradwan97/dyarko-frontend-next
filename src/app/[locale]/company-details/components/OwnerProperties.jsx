import React from 'react'
import Typography from '@/src/app/[locale]/components/Shared/Typography';
import BuildingSolid from '@/src/app/[locale]/components/UI/icons/BuildingSolid';
import PropertiesSection from '@/src/app/[locale]/landingPage/properties/PropertiesSection';
import Paginator from '@/src/app/[locale]/components/Shared/pagination/Pagination';
import { useTranslations } from 'next-intl';

const OwnerProperties = ({ properties, totalCount, pages, page, setPage, activeTab, isFetching }) => {
    const tGeneral = useTranslations("General")
    const t = useTranslations("Companies.Details")
    return (
        <>
            {isFetching ? (
                <Typography variant="body-md" as="h2" className="mt-10 text-gray-400">
                    {tGeneral("loading")}
                </Typography>
            ) : (
                <>
                    <div className="mt-9 flex items-center justify-between">
                        <Typography variant="h2" as="h2" className="text-black">
                            {t(activeTab)}
                        </Typography>
                        <div className="hidden items-end sm:flex">
                            <BuildingSolid className="mr-3 h-5 w-5 fill-main-500" />
                            <Typography variant="body-sm" as="p" className="text-black/75">
                                {`${totalCount} ${totalCount === 1 ? tGeneral('property') : tGeneral('properties')}`}
                            </Typography>
                        </div>
                    </div>
                    <PropertiesSection properties={properties} />
                    <Paginator lastPage={pages} page={page} onChange={(e) => setPage(e)} />
                </>
            )}
        </>
    )
}

export default OwnerProperties
import React from 'react'
import Typography from '@/app/components/Shared/Typography';
import BuildingSolid from '@/app/components/UI/icons/BuildingSolid';
import PropertiesSection from '@/app/landingPage/properties/PropertiesSection';
import Paginator from '@/app/components/Shared/pagination/Pagination';

const OwnerProperties = ({ properties, totalCount, pages, page, setPage }) => {
    return (
        <>
            {properties?.length > 0 ? (
                <>
                    <div className="mt-9 flex items-center justify-between">
                        <Typography variant="h2" as="h2" className="text-black">
                            All properties
                        </Typography>
                        <div className="hidden items-end sm:flex">
                            <BuildingSolid className="mr-3 h-5 w-5 fill-main-500" />
                            <Typography variant="body-sm" as="p" className="text-black/75">
                                {`${totalCount} ${totalCount === 1 ? 'Property' : 'Properties'}`}
                            </Typography>
                        </div>
                    </div>
                    <PropertiesSection properties={properties} />
                    <Paginator lastPage={pages} page={page} onChange={(e) => setPage(e)} />
                </>
            ) : (
                <Typography variant="body-md" as="h2" className="mt-10 text-gray-400">
                    No properties here!
                </Typography>
            )}
        </>
    )
}

export default OwnerProperties
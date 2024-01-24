'use client'
import React, { useState } from "react";
import Link from "next/link";
import Button from "@/app/components/Shared/Button";
import Typography from "@/app/components/Shared/Typography";
import ChevronDown from "@/app/components/UI/icons/ChevronDown";
import PlusOutline from "@/app/components/UI/icons/PlusOutline"

import {useGetReviews} from "../../companies/ownersApis"
import LeaveAReview from "./LeaveAReview";
import SingleReview from "./SingleReview";
import { useQuery } from "react-query";

const baseUrl = process.env.NEXT_PUBLIC_NEXT_APP_API_URI

function ClientReview(props) {
    const [visible, setVisible] = useState(false);
    

   const {data, isLoading} = useGetReviews(props.id)
   
    return (
        <>
            <div className="mt-24 rounded-lg border-gray-200 md:border">
                <div className="flex items-center justify-between border-gray-200 py-5 md:border-b md:px-10">
                    <Typography variant="h4" as="h4" className="!text-xl text-black">
                        Client Reviews
                    </Typography>
                    <Button
                        variant="primary"
                        className="hidden items-center !p-3 text-sm md:flex"
                        onClick={() => {
                            setVisible(true);
                        }}
                    >
                        Add Review
                        <PlusOutline className="ml-2.5 h-4 w-4 stroke-white" />
                    </Button>
                </div>
                <div className="space-y-6 md:p-10">
                    {data?.reviews?.length !== 0 ? (
                        <>
                            {data?.reviews?.map((rev) => (
                                <SingleReview review={rev} />
                            ))}
                            <Button
                                variant="button"
                                className="transition-color group mt-12 hidden items-center space-x-2 rounded-lg border border-black p-4 outline-0  duration-500 ease-in-out hover:bg-black hover:text-white group-hover:bg-black md:flex"
                            >
                                <Typography
                                    variant="body-md"
                                    as="span"
                                    className="text-black group-hover:text-white"
                                >
                                    See more
                                </Typography>
                                <ChevronDown className="h-3 w-3 stroke-black !stroke-1 group-hover:stroke-white" />
                            </Button>
                        </>
                    ) : (
                        <Typography variant="body-md" as="h2" className="text-gray-400">
                            No reviews ...
                        </Typography>
                    )}

                    <Button
                        variant="primary"
                        className="flex w-full items-center justify-center !p-3 text-sm md:hidden"
                        onClick={() => setVisible(true)}
                    >
                        <PlusOutline className="mr-2 h-4 w-4 stroke-white" />
                        Add Review
                    </Button>
                </div>
            </div>

            <LeaveAReview visible={visible} setVisible={setVisible} ownerId={props.id} />
        </>
    );
}

export default ClientReview;

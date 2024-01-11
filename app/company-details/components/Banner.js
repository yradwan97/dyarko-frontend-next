import companyBanner from "../../../public/assets/companyBanner.png";
import companyImg from "../../../public/assets/company.png";
import Button from "../../components/Shared/Button";
import Typography from "../../components/Shared/Typography";
import Loader from "../../components/Shared/Loader";
import { Rating } from "@mui/material";
import { useQuery } from "react-query";
import Image from "next/image";
import { useEffect } from "react";
import {sendFollowRequest} from "../../utils/utils"

const baseUrl = process.env.NEXT_PUBLIC_NEXT_APP_API_URI

function Banner({id}) {

    const { data, isFetching, isRefetching, refetch } = useQuery("owner", 
        async () => await fetch(`${baseUrl}/owners/${id}`).then(res => res.json())
    )
    
    useEffect(() => {
        refetch()
    }, [id])
    return (isFetching || isRefetching) ? (
        <Loader />
    ) : (
        <div className="relative">
            <Image src={companyBanner} className="h-[250px] w-auto" alt="" />
            <div className="relative -mt-[90px] flex w-full flex-col items-center md:top-full md:mt-0 md:-translate-y-1/2 md:flex-row  md:items-end md:px-[7rem]">
                <Image
                    src={data?.data.image || companyImg}
                    className="h-[183px] w-[183px]"
                    alt=""
                    width={200}
                    height={200}
                    crossOrigin="anonymous"
                />
                <div className="mt-6 flex flex-grow flex-col text-center md:ml-8 md:mt-0 md:text-left">
                    <Typography variant="h4" as="h4" className=" mb-3 text-black md:mb-0">
                        {data?.data.name}
                    </Typography>
                    <div className="flex items-center justify-center space-x-1 md:justify-start">
                        <Rating
                            name="simple-controlled"
                            value={data?.data.average_rating}
                            readOnly
                            size="small"
                            sx={{
                                ".MuiRating-iconFilled": {
                                    color: "#F15A29",
                                },
                            }}
                        />

                        <Typography variant="body-sm-medium" as="span" className="text-black">
                            {data?.data.average_rating} review
                        </Typography>
                    </div>
                </div>
                <div className="relative col-span-1 hidden text-end sm:col-span-2 md:col-span-1 md:block">
                    <Button variant="primary" className="!px-5 !py-2 text-sm font-bold" onClick={() => sendFollowRequest(id)}>
                        Follow
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Banner;

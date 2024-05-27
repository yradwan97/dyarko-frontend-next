import React, { useEffect, useState } from "react";
import companyBanner from "../../../../../public/assets/companyBanner.png";
import companyImg from "../../../../../public/assets/company.png";
import Button from "../../components/Shared/Button";
import Typography from "../../components/Shared/Typography";
import { Rating } from "@mui/material";
import Image from "next/image";
import { sendFollowRequest, useGetSingleOwner, isFollowed } from "@/src/app/[locale]/companies/ownersApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

function Banner({id}) {
    const router = useRouter()
    const {data, isFetching, refetch} = useGetSingleOwner(id)
    const {data: session} = useSession()
    const [followed, setFollowed] = useState(false)
    const t = useTranslations("Companies.Details")
    
    const handleFollow = async () => {
        if (!session) {
            router.push("/login")
            return
        }
        let res = await sendFollowRequest(id)
        
        res.data?.success && refetch()
    }

    useEffect(() => {
        const checkFollow = async () => {
            let ownerFollowed = await isFollowed(id, session?.user?.accessToken)
            setFollowed(ownerFollowed)
        }
        checkFollow()
        
    }, [session, id, data])
    
    useEffect(() => {
        refetch()
    }, [id, refetch])

    return (
    <div className="relative">
      <Image src={companyBanner} className="h-[250px] w-auto" alt="" />
      <div className="relative -mt-[90px] flex w-full flex-col items-center md:top-full md:mt-0 md:-translate-y-1/2 md:flex-row md:items-end md:px-[7rem]">
        <Image src={data?.image || companyImg} className="h-[183px] w-[183px]" alt="" width={200} height={200} />
        <div className="mt-6 flex flex-grow flex-col text-center md:ml-8 md:mt-0 md:text-left">
          <Typography variant="h4" as="h4" className=" mb-3 capitalize text-black md:mb-0">
            {data?.name}
          </Typography>
          <div className="flex items-center justify-center space-x-1 md:justify-start">
            <Rating
              name="simple-controlled"
              value={data?.average_rating || null}
              readOnly
              size="small"
              sx={{
                '.MuiRating-iconFilled': {
                  color: '#F15A29',
                },
              }}
            />
            <Typography variant="body-sm-medium" as="span" className="text-black">
              {parseFloat(data?.average_rating).toFixed(1)}
            </Typography>
          </div>
        </div>
        <div className="relative col-span-1 hidden text-end sm:col-span-2 md:col-span-1 md:block">
          <Button
            variant={!followed ? 'primary' : 'primary-outline'}
            disabled={followed}
            className="!px-5 !py-2 font-bold"
            onClick={handleFollow}
          >
            {followed ? t('unfollow') : t('follow')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Banner;

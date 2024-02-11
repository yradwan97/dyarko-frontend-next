import Link from "next/link";
import company from "../../public/assets/company.png"
import Button from "../components/Shared/Button"
import Typography from "../components/Shared/Typography"
import BuildingSolid from "../components/UI/icons/BuildingSolid"
import { Rating } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { isFollowed, sendFollowRequest } from "./ownersApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "../components/Shared/Loader";

const SingleCompany = ({ owner, onTriggerRefetch }) => {

    const { data: session } = useSession()

    const router = useRouter()
    const [followed, setFollowed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const handleFollow = async (e) => {
        e.preventDefault()
        if (!session) {
            router.push("/login")
            return
        }
        let res = await sendFollowRequest(owner._id)
        console.log(res)
        if (res.data.success) {
            setFollowed(!followed)
            onTriggerRefetch()
        }
    }



    useEffect(() => {
        const checkFollow = async () => {
            let ownerFollowed = await isFollowed(owner._id, session?.user?.accessToken)
            setFollowed(ownerFollowed)
        }

        checkFollow()
    }, [session, owner])

    if (isLoading) return <Loader />
    return (
        <div
            className={`relative grid grid-cols-1 gap-y-4 rounded-lg bg-main-100 p-1 sm:grid-cols-2 sm:gap-8 sm:p-6 lg:grid-cols-4`}
        >
            <div className="relative col-span-1">
                <Image
                    src={owner.image || company}
                    width={200}
                    height={200}
                    priority={true}
                    alt="property"
                    className="h-[240px] w-full rounded-lg sm:w-[240px]"
                    crossOrigin="anonymous"
                />
                {/* commented as per Fahiem's request*/}
                <Button onClick={handleFollow} variant={!followed ? "primary" : "primary-outline"} className={`!absolute !top-2 !right-2 !rounded-md !py-1 !px-2 transition-all duration-500 sm:!hidden`}>
                    <Typography variant="body-xs-medium" as="p" >
                        {followed ? "Unfollow" : "Follow"}
                    </Typography>
                </Button>
            </div>
            <div className=" col-span-1 mb-1 flex-grow md:col-span-2">
                <div className="flex items-center justify-between">
                    <Link href={`/company-details/${owner._id}`} >
                        <Typography variant="h4" as="h4" className="text-black capitalize">
                            {owner.name}
                        </Typography>
                    </Link>
                    <div className="flex items-center justify-center space-x-1">
                        <Typography variant="body-xl-bold" as="p" className="text-[#423E5B]">
                            {owner.average_rating > 0 ? parseFloat(owner.average_rating).toFixed(1) : "No reviews"}
                        </Typography>
                        <Rating name="simple-controlled" value={owner.average_rating} readOnly />
                    </div>
                </div>
                {/* <div className="col-span-1 mt-1 flex items-end">
                    <BuildingSolid className="mr-3 h-5 w-5 fill-main-500" />
                    <Typography variant="body-sm" as="p" className="text-black/75">
                        {owner.number_of_properties || 0} Properties
                    </Typography>
                </div> */}
                <Typography variant="body-md" as="p" className="mt-4 mb-8 text-gray-600">
                    {owner.about
                        ? owner.about
                        :
                        `We provide comprehensive property protection and liability coverage
                         to ensure our customers enjoy a secure and worry-free life. 
                         Our insurance solutions are designed to safeguard your assets and enhance your peace of mind, 
                         offering you a better and more secure future.`
                    }
                </Typography>
            </div>
            <div className="relative col-span-1 hidden text-start lg:text-end sm:col-span-2 sm:block md:col-span-1">
                <Button variant={!followed ? "primary" : "primary-outline"} className="!px-5 !py-2 font-bold"
                    onClick={handleFollow}>
                    {followed ? "Unfollow" : "Follow"}
                </Button>
            </div>
        </div>
    );
}

export default SingleCompany;

import { Rating } from "@mui/material";
import avatar from "../../../public/assets/avatar.png";
import Typography from "@/app/components/Shared/Typography";
import { Review } from "@/app/types/types";
import Image from "next/image";

interface SingleReviewProps {
    review: Review;
}

function SingleReview(props: SingleReviewProps) {
    return (
        <div className="space-y-4 rounded-lg border border-main-300 bg-main-100 px-7 py-10">
            <div className="flex items-center space-x-4">
                <Image src={avatar} className="h-16 w-16 rounded-full" alt="" />
                <div className="flex flex-col space-y-2 md:space-y-3">
                    <Typography variant="body-lg-bold" as="h4">
                        {props.review.owner}
                    </Typography>
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                        <Rating value={props.review.rate} readOnly />
                        <Typography variant="body-xs-medium" as="span" className="text-black">
                            {props.review.rate} review
                        </Typography>
                    </div>
                </div>
            </div>
            <Typography
                variant="body-md-medium"
                as="p"
                className="text-gray-600 md:w-10/12 md:text-gray-800"
            >
                {props.review.comment}
            </Typography>
            <Typography variant="body-sm-medium" as="span" className="block text-gray-500">
                {props.review.createdAt}
            </Typography>
            <div>add delete here</div>
        </div>
    );
}

export default SingleReview;

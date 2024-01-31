import Image from 'next/image';
import Typography from '@/app/components/Shared/Typography';
import { Rating } from '@mui/material';
import type { Review } from "@/app/types/types";
import avatar from '../../../public/assets/avatar.png';
import {format} from "date-fns"

interface Props {
    review: Review
}

function SingleReview({ review } : Props) { 

  return (
    <div
      className="space-y-4 flex flex-row rounded-lg border border-main-300 bg-main-100 px-7 py-10"
    >
        <div className='flex flex-col w-3/4 space-y-6'>
            <div className="flex items-center space-x-4">
                <Image src={avatar} className="h-16 w-16 rounded-full" alt="" />
                    <div className="flex flex-col space-y-2 md:space-y-3">
                        <Typography variant="body-lg-bold" as="h4">
                        {review.owner}
                        </Typography>
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                        <Rating value={review.rate} readOnly />
                    </div>
                </div>
            </div>
            <Typography variant="body-md-medium" as="p" className="text-gray-600 md:w-10/12 md:text-gray-800">
                {review.comment}
            </Typography>
            <Typography variant="body-sm-medium" as="span" className="block text-gray-500">
                {format(new Date(review.createdAt), "dd/MM/yyyy  HH:mm")}
            </Typography>
        </div>
    </div>
  );
}

export default SingleReview;

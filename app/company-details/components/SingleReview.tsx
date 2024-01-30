import { useEffect, useState } from 'react';
import Image from 'next/image';
import Typography from '@/app/components/Shared/Typography';
import { Rating } from '@mui/material';
import type { Review } from "@/app/types/types";
import avatar from '../../../public/assets/avatar.png';
import Button from '@/app/components/Shared/Button';
import {format} from "date-fns"
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useSession } from 'next-auth/react';

interface Props {
    review: Review
    onDeleteReview: (id: string) => void
}

function SingleReview({ review, onDeleteReview } : Props) {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const {data: session} = useSession()

  const handleShowDeleteButton = (mouseEvent: string) => {
    //@ts-ignore
    let isThisReviewMine = review.user === session?.user?._id;
    if (isThisReviewMine) {
        if (mouseEvent === "enter") {
            setShowDeleteButton(true)
            return
        }
    }
    setShowDeleteButton(false)
  }


  
  const handleDelete = () => {
    confirmAlert({
        title: 'Delete your review.',
        message: 'Are you sure you want to do this?',
        buttons: [
          {
            label: 'Yes',
            //TODO: implement deleting review here
            onClick: () => onDeleteReview(review._id)
          },
          {
            label: 'No',
            onClick: () => {return}
          }
        ]
      });
  };

  return (
    <div
      className="space-y-4 flex flex-row rounded-lg border border-main-300 bg-main-100 px-7 py-10"
      onMouseEnter={() => handleShowDeleteButton("enter")}
      onMouseLeave={() => handleShowDeleteButton("leave")}
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
        <div className='relative flex justify-end align-top -translate-y-2 w-1/4'>
            {showDeleteButton && (
                <Button
                    variant='primary'
                    className="h-[25%] !px-2 !py-1"
                    onClick={handleDelete}
                >
                    X
                </Button>
            )}
        </div>
    </div>
  );
}

export default SingleReview;

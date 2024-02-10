import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import Overlay from "../../property-details/components/Overlay";
import Button from "@/app/components/Shared/Button";
import Typography from "@/app/components/Shared/Typography";
import CloseOutline from "../../components/UI/icons/CloseOutline";
import Input from "../../components/Shared/Form/Input";
import { useAddReview } from "../../companies/ownersApi";

function LeaveAReview({ visible, setVisible, ownerId, onTriggerRefetch }) {
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");

  const { addReview, isSuccess, reset } = useAddReview(ownerId);

  const handleAddReview = async (event) => {
    event.preventDefault();
    addReview({ owner: ownerId, rate, comment })
    setRate(0);
    setComment("");
    setTimeout(() => {
      reset()
    }, 5000);
  };

  useEffect(() => {
    if (isSuccess) {
      onTriggerRefetch()
    }
  }, [isSuccess])

  return (
    <Overlay visible={visible} setVisible={setVisible}>
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="mx-auto rounded-lg bg-white md:w-6/12 ">
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <Typography variant="body-md-bold" as="p">
              Leave a review
            </Typography>
            <span
              className="flex items-center justify-center"
              onClick={() => setVisible(false)}
            >
              <CloseOutline className="h-4 w-4 cursor-pointer stroke-gray-500 stroke-2" />
            </span>
          </div>

          {isSuccess ? (
            <div className="py-8 px-6 text-center">Thank you for your review</div>
          ) : (
            <form onSubmit={handleAddReview} className="py-8 px-6">
              <Typography variant="body-sm-bold" as="h6" className="mb-1 capitalize text-black">
                Rate
              </Typography>
              <Rating
                name="simple-controlled"
                value={rate}
                onChange={(event, newValue) => setRate(newValue)}
              />
              <Typography variant="body-sm-bold" as="h6" className="mb-1 capitalize text-black">
                Review
              </Typography>
              <Input
                as="textarea"
                className="bg-main-100"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
              <Button variant="primary" className="mt-12 w-full text-center text-sm" type="submit">
                Submit
              </Button>
            </form>
          )}
        </div>
      </div>
    </Overlay>
  );
}

export default LeaveAReview;

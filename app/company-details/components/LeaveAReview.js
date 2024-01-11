import { Rating } from "@mui/material";
import { useRef, useState } from "react";
import Overlay from "../../property-details/components/Overlay";
import Button from "@/app/components/Shared/Button";
import Typography from "@/app/components/Shared/Typography";
import CloseOutline from "../../components/UI/icons/CloseOutline";
import Input from "../../components/Shared/Form/Input";
import {useAddReview} from "../ownersApis"

function LeaveAReview(props) {
    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState("");
    let formRef = useRef(false)

    
    const { addReview, isSuccess, reset } = useAddReview(props.id);

    const handleAddReview = async (event) => {
        event.preventDefault();
        await addReview({ owner: props.ownerId, rate, comment });
        setRate(0);
        setComment("");
        setTimeout(() => {
            reset()
        }, 5000)
    };

    return (
        <Overlay visible={props.visible} setVisible={props.setVisible}>
            <div className="relative flex h-full w-full items-center justify-center">
                <div className="mx-auto rounded-lg bg-white md:w-6/12 ">
                    <div className="flex items-center justify-between border-b border-gray-200 p-6">
                        <Typography variant="body-md-bold" as="p">
                            Leave a review
                        </Typography>
                        <span
                            className="flex items-center justify-center"
                            onClick={() => props.setVisible(false)}
                        >
                            <CloseOutline className="h-4 w-4 cursor-pointer stroke-gray-500 stroke-2" />
                        </span>
                    </div>

                    {isSuccess ? (
                        <div className="py-8 px-6 text-center">Thank you for your review</div>
                    ) : (
                        <div className="py-8 px-6 ">
                            {/* <Form onSubmit={handleAddReview}> */}
                            <form key={formRef} onSubmit={handleAddReview}>
                                <Typography
                                    variant="body-sm-bold"
                                    as="h6"
                                    className="mb-1 capitalize text-black"
                                >
                                    Rate
                                </Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={rate}
                                    onChange={(newValue) => {
                                        setRate(parseInt(newValue.target.value));
                                    }}
                                />
                                <Typography
                                    variant="body-sm-bold"
                                    as="h6"
                                    className="mb-1 capitalize text-black"
                                >
                                    Review
                                </Typography>
                                <Input
                                    as="textarea"
                                    className="bg-main-100"
                                    onChange={(e) => setComment(e.target.value)}
                                ></Input>
                                <Button
                                    variant="primary"
                                    className="mt-12 w-full text-center text-sm"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </Overlay>
    );
}

export default LeaveAReview;

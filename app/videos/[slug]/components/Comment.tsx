import React from "react";
import Typography from "../../../components/Shared/Typography";
import LikesAndComments from "./LikesAndComments";
import Image from "next/image";

type CommentProps = {
  children: string;
  comment: any
};

function Comment({comment}: CommentProps) {
  
  return (
    <div className="mt-4 pl-12">
      <div className="flex items-center">
        <Image className="mr-4 h-9 w-9" src={comment?.user.image} width={200} height={200} alt="" />
        <Typography variant="body-md-bold" as="p">
          {comment?.user.name}          
        </Typography>
      </div>
      <div className="pl-12">
        <Typography
          variant="body-sm-medium"
          as="p"
          className="mb-2 text-gray-700"
        >
          {comment?.comment_body}
        </Typography>
        <LikesAndComments comment={comment}/>
      </div>
    </div>
  );
}

export default Comment;

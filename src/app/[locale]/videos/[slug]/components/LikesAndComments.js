import React, { useEffect, useState } from "react";
import Typography from "@/src/app/[locale]/components/Shared/Typography";
import { HeartIcon } from "@heroicons/react/24/outline";
import { likeVideoComment } from "../../videoService";

function LikesAndComments({comment}) {
  const [liked, setLiked] = useState(comment?.like?.status);
  const [likes, setLikes] = useState(comment?.like?.count)
  useEffect(() => {
    setLikes(comment.like.count)
    setLiked(comment.like.status)
  }, [comment])
  return (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col">
        <div className="relative">
          <HeartIcon
            className={`${
              liked ? "stroke-main-yellow-600" : "stroke-black"
            }  h-5 w-5 cursor-pointer`}
            onClick={ 
              async () => {
                let res = await likeVideoComment(comment?._id, liked)
                if (res.status === 200) {
                  liked ? setLikes(likes => likes - 1) : setLikes(likes => likes + 1)
                  setLiked(!liked)
                }
              }
            }
          />
          <Typography
            variant="body-xs-bold"
            as="span"
            className={`${
              liked ? "text-main-yellow-600" : "text-black"
            }  absolute top-1 -right-2`}
          >
            {likes}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default LikesAndComments;

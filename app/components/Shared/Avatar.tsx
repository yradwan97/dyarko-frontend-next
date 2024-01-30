import React from "react";
import Typography from "./Typography";
import CheckOutline from "../UI/icons/CheckOutline"
import Image from "next/image";

type AvatarProps = {
  userName: string;
  link: string;
  userImg?: string;
  className?: string;
  isVerified?: boolean;
};

const Avatar = ({ userName, userImg, isVerified, className }: AvatarProps) => {
  
  const generateProfileImg = (name: string): string => {
    const names = name?.split(" ")?.slice(0, 2);
    return names?.reduce(
      (prev, curr) => prev.concat(curr[0].toUpperCase()),
      ""
    );
  };
  return (
    <div
      className={`relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-main-600 ${
        className || ""
      }`.trimEnd()}
    >
      {userImg ? (
        <Image
          className="rounded-full"
          src={userImg}
          alt={userName}
          width={100}
          height={100}
        />
      ) : (
        <Typography variant="body-lg-bold" className="text-white" as="span">
          {generateProfileImg(userName)}
        </Typography>
      )}
      {isVerified ? (
        <div className="absolute top-[70%] right-0 flex h-3 w-3 items-center justify-center rounded-full border border-white bg-green">
          <CheckOutline className="h-2 w-2 stroke-white" />
        </div>
      ) : null}
    </div>
  );
};

export default Avatar;

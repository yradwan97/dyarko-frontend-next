import React from "react";
import Typography from "../Shared/Typography";
import Link from "next/link";
import Image from "next/image";
import loginPic1 from "../../../public/assets/login/login-1.png"
import loginPic2 from "../../../public/assets/login/login-2.png"
import loginPic3 from "../../../public/assets/login/login-3.png"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const PoweredBy = () => {
  
  return (
    <section className="hidden flex-1 bg-gradient-to-b from-main-100 lg:block">
      <div className="container flex h-full flex-col items-center justify-center gap-y-20 px-14 py-10 lg:flex">
      <Carousel
  autoPlay
  interval={2000}
  infiniteLoop
  showArrows={false}
  showStatus={false}
  renderIndicator={(onClickHandler, isSelected, index, label) => {
    const defStyle = {
      marginLeft: 20,
      cursor: "pointer",
      display: "inline-block",
      width: 10,
      height: 10,
      borderRadius: "50%",
      backgroundColor: isSelected ? "black" : "white",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
      border: "2px solid black",
    };

    return (
      <span
        style={defStyle}
        onClick={onClickHandler}
        onKeyDown={onClickHandler}
        value={index}
        key={index}
        role="button"
        tabIndex={0}
        aria-label={`${label} ${index + 1}`}
      />
    );
  }}
>
          {[loginPic1.src, loginPic2.src, loginPic3.src].map((image, index) => (
            <div key={index}>
              <Image src={image} width={500} height={500} alt="login-pic" priority />
            </div>
          ))}
        </Carousel>
        <div>
          <Typography variant="body-sm-medium" as="p" className="mb-6">
            Powered by
          </Typography>
          <Typography variant="body-xs" as="p" className="text-gray-500">
            You agree to Estatery&apos;s{" "}
            <Link href="/terms-conditions" className="font-medium text-main-600">
              Terms of Use & Privacy Policy.
            </Link>{" "}
            You don&apos;t need to consent as a condition of renting any property, or
            buying any other goods or services. Message/data rates may apply.
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default PoweredBy;

import React from "react";
import Title from "../components/Title";
import Button from "../../components/Shared/Button";
import Typography from "../../components/Shared/Typography";

function Newsletter() {
  return (
    <div className="bg-gradient-to-b from-main-100 to-white">
      <div className="container mx-auto py-20 text-center">
        <Typography variant="h4" as="h4" className="text-main-600">
          No Spam Promise
        </Typography>
        <div className="mt-3 flex flex-col space-y-4">
          <Title
            type="main"
            head="Are you a landlord?"
            desc="Discover ways to increase your home's value and  get listed. No Spam."
          />
        </div>
        <div className="relative mx-auto mt-8 w-full md:w-6/12">
          <input
            type="text"
            className="w-full rounded-lg p-5 text-sm lg:text-lg"
            placeholder="Enter your email address"
          />
          <Button
            variant="primary"
            className="absolute top-1/2 right-5 -translate-y-1/2"
          >
            Submit
          </Button>
        </div>
        <Typography
          variant="body-sm-medium"
          as="p"
          className=" mt-5 text-gray-400"
        >
          Join <span className="text-main-600">10,000+</span> other landlords in
          our Dyarko community.
        </Typography>
      </div>
    </div>
  );
}

export default Newsletter;

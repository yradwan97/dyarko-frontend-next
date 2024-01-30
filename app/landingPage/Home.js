'use client'
import React from "react";
import dynamic from "next/dynamic";

import Header from "../components/Shared/Header/Header"
import Slider from "./slider/Slider"

const Services = dynamic(() => import("./services/Services.jsx"))
const Properties = dynamic(() => import("./properties/Properties.jsx"))
const RelatedVideos = dynamic(() => import("./videos/RelatedVideos.jsx"))
const AboutUs = dynamic(() => import("./aboutUs/AboutUs.jsx"))
const FeaturedCompanies = dynamic(() => import("./FeaturedCompanies/FeaturedCompanies.jsx"))
const Newsletter = dynamic(() => import("./Newsletter/Newsletter.jsx"))
const Footer = dynamic(() => import("../components/Shared/Footer/Footer.jsx"))

const Home = () => {
    
    return (
        <>
            <Header />
            <Slider />
            <Services />
            <Properties />
            <RelatedVideos />
            <AboutUs />
            <FeaturedCompanies />
            <Newsletter />
            <Footer />
        </>
    )
}

export default Home
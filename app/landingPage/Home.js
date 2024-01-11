'use client'
import React from "react";
import dynamic from "next/dynamic";

import Header from "../components/Shared/Header/Header"
import Slider from "./slider/Slider"

const Services = dynamic(() => import("./services/Services"))
const Properties = dynamic(() => import("./properties/Properties"))
const RelatedVideos = dynamic(() => import("./videos/RelatedVideos"))
const AboutUs = dynamic(() => import("./aboutUs/AboutUs"))
const FeaturedCompanies = dynamic(() => import("./FeaturedCompanies/FeaturedCompanies"))
const Newsletter = dynamic(() => import("./Newsletter/Newsletter"))
const Footer = dynamic(() => import("../components/Shared/Footer/Footer"))

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
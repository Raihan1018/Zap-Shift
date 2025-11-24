import React from "react";
import Banner from "../Banner/Banner";
import HowWorks from "../HowWorks/HowWorks";
import OurServices from "../OurServices/OurServices";
import Brands from "../Brands/Brands";
import FeaturesSection from "../FeaturesSection/FeaturesSection";
import Reviews from "../Reviews/Reviews";

const reviewsPromise = fetch("./reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner />
      <HowWorks />
      <OurServices />
      <Brands />
      <FeaturesSection />
      <Reviews reviewsPromise={reviewsPromise} />
    </div>
  );
};

export default Home;

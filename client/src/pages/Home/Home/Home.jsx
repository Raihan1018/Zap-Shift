import React from "react";
import Banner from "../Banner/Banner";
import HowWorks from "../HowWorks/HowWorks";
import OurServices from "../OurServices/OurServices";
import Brands from "../Brands/Brands";
import FeaturesSection from "../FeaturesSection/FeaturesSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <HowWorks />
      <OurServices />
      <Brands />
      <FeaturesSection />
    </div>
  );
};

export default Home;

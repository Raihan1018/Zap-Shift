import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import Button from "../../../components/Button/Button";

const banners = [bannerImg1, bannerImg2, bannerImg3];

const Banner = () => {
  return (
    <div className="w-full">
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        showThumbs={false}
        showStatus={false}
        emulateTouch
      >
        {banners.map((img, index) => (
          <div key={index} className="relative w-full">
            {/* Responsive image */}
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] object-cover"
            />

            {/* Button container */}
            <div className="absolute bottom-5 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-3 sm:gap-4 w-11/12 sm:w-auto justify-center items-center">
              <Button
                className="bg-lime-500 text-white font-semibold py-3 px-6 sm:px-8 rounded-full w-full sm:w-auto text-sm sm:text-base hover:bg-white hover:text-lime-500 shadow-lg hover:scale-105 transition transform duration-300"
                text="Track Your Parcel"
              />
              <Button
                className="bg-lime-500 text-white font-semibold py-3 px-6 sm:px-8 rounded-full w-full sm:w-auto text-sm sm:text-base hover:bg-white hover:text-lime-500 shadow-lg hover:scale-105 transition transform duration-300"
                text="Be A Rider"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;

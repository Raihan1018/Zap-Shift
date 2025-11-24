import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';

import "swiper/css";
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import startPeople from "../../../assets/brands/start_people.png";
import star from "../../../assets/brands/star.png";

const brandsLogo = [amazon, casio, moonstar, randstad, startPeople, star];

const Brands = () => {
  return (
    <>
    <h2 className="text-center md:font-semibold  py-3">We help thousand of company</h2>
    <Swiper
    className="my-4"
      loop={true}
      slidesPerView={4}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      
      {brandsLogo.map((logo, index) => (
        <SwiperSlide key={index}>
          <img src={logo} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  );
};

export default Brands;

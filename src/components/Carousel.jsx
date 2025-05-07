import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

function FocusOnSelect() {
  const sliderRef = useRef(null);

  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // For screens smaller than 1024px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 768, // For screens smaller than 768px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Hide arrows for smaller screens
        },
      },
      {
        breakpoint: 480, // For screens smaller than 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider ref={sliderRef} {...settings}>
        {[1, 2].map((item, index) => {
          return (
            <div
              key={index}
              className="relative flex justify-center items-center h-[100vh]" // Ensure full height
            >
              <img
                src="/mobile-legends-carousel.jpg"
                alt="Carousel Item 1"
                className="absolute left-0 top-0 w-full h-full object-cover" // Ensure the image covers the entire container
              />

              <div className="absolute left-0 top-0 inset-0 bg-black bg-opacity-50 z-1"></div>

              <div className="absolute z-2 top-[20%] left-[10%] md:top-[280px] md:left-[60px]">
                <h1 className="text-white text-2xl md:text-4xl font-bold mb-4">
                  Mobile Legends: Bang <br /> Bang
                </h1>
                <p className="mb-4 text-sm md:text-base">
                  Mobile legends uchun olmoslarni eng yaxshi narxlarda oling.{" "}
                  <br /> Tez va xavfsiz
                </p>
                <Link to="/purchase" className="text-white bg-blue-700 hover:bg-blue-500 transition px-4 py-2 md:px-6 md:py-2 rounded">
                  Sotib olish
                </Link>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default FocusOnSelect;

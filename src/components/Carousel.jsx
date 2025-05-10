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
    <div className="slider-container mx-auto my-4" style={{ maxWidth: "90%" }}>
      <Slider ref={sliderRef} {...settings}>
        {[1, 2].map((item, index) => {
          return (
            <div
              key={index}
              className="relative flex justify-center items-center h-[60vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]" // Adjust height for smaller size
            >
              <img
                src="/mobile-legends-carousel.jpg"
                alt="Carousel Item 1"
                className="absolute left-0 top-0 w-full h-full object-cover" // Ensure the image covers the entire container
              />

              <div className="absolute left-0 top-0 inset-0 bg-black bg-opacity-50 z-1"></div>

              <div className="absolute z-2 top-[15%] left-[8%] sm:top-[10%] sm:left-[6%] md:top-[200px] md:left-[40px] px-3 md:px-0">
                <h1 className="text-white text-lg sm:text-base md:text-3xl font-bold mb-3 leading-tight md:leading-normal">
                  Mobile Legends: Bang <br /> Bang
                </h1>
                <p className="mb-3 text-xs sm:text-xs md:text-sm leading-snug md:leading-normal">
                  Mobile legends uchun olmoslarni eng yaxshi narxlarda oling.{" "}
                  <br /> Tez va xavfsiz
                </p>
                <Link
                  to="/mobile-legends"
                  className="text-white bg-blue-700 hover:bg-blue-500 transition px-2 py-1 sm:px-3 sm:py-1 md:px-5 md:py-2 rounded text-xs sm:text-sm md:text-base"
                >
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

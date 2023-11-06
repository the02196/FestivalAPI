import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./../index.css";

function Example4() {
  const [isActive, setIsActive] = useState("close");
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={2}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {Array(50)
          .fill()
          .map((e, i) => {
            return <SwiperSlide key={i}>Slide {i + 1}</SwiperSlide>;
          })}
      </Swiper>
      <button
        onClick={() => {
          setIsActive(isActive === "open" ? "close" : "open");
        }}
      >
        클릭
      </button>
      <span> {isActive}</span>
      {
        isActive === "open" && 
        <p
          className={`text-center font-bold border ${
            isActive === "open" ? "on" : "active"
          }`}
        >
          Lorem ipsum dolor sit amet.
        </p>
      }
      {/* <p className={`text-center font-bold border ${isActive === "open" && "on"}`} style={{display: isActive === "open" ? "block" : "none"}}>Lorem ipsum dolor sit amet.</p> */}
    </>
  );
}

export default Example4;

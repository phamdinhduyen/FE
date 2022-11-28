import React from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getCarousel } from "../../redux/slices/carouselSlice";
const CarouselMain = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCarousel());
  }, []);

  const carouselData = useSelector((state) => state.carousel.entities);
  const carousel = carouselData.data;

  const contentStyle = {
    height: "315px",
    color: "#fff",
    lineHeight: "460px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <div className="carousel">
      <Carousel autoplay>
        {carousel?.map((image) => (
          <div key={image}>
            <h3 style={contentStyle}>
              <img className="carousel_img_home" src={image} alt="" />
            </h3>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselMain;

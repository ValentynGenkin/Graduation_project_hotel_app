import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/room.infoCard.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import PropTypes from "prop-types";

function RoomInfoCard({ data }) {
  RoomInfoCard.propTypes = {
    data: PropTypes.array.isRequired,
  };
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <div className="block">
      <div className="carousel">
        <BsArrowLeftCircleFill
          className="arrow arrow-left"
          onClick={prevSlide}
        />
        {data.slides.map((item, idx) => {
          return (
            <img
              src={item.src}
              alt={item.alt}
              key={idx}
              className={slide === idx ? "slide" : "slide slide-hidden"}
            />
          );
        })}
        <BsArrowRightCircleFill
          className="arrow arrow-right"
          onClick={nextSlide}
        />
      </div>

      <div className="info">
        <div>
          <ul>
            <li>Comfy beds, 8,5 - Based on 425 reviews</li>
            <li>Room Size: 23m</li>
            <li>Price: 100$</li>
            <li>Free toiletries</li>
          </ul>
        </div>
        <div className="buttons">
          <Link to={"/information"}>
            <button>Information</button>
          </Link>
          <button>Book</button>
        </div>
      </div>
    </div>
  );
}

export default RoomInfoCard;

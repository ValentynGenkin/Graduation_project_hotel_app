import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/roomInfoCard.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

function RoomInfoCard({ data }) {
  RoomInfoCard.propTypes = {
    data: PropTypes.array.isRequired,
  };
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide((slide + 1) % data.slides.length);
  };

  const prevSlide = () => {
    setSlide((slide - 1 + data.slides.length) % data.slides.length);
  };

  return (
    <Container>
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
            <Link to={"/RoomDetailsCard"}>
              <button>Information</button>
            </Link>
            <button>Book</button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default RoomInfoCard;

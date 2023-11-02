import React, { useState } from "react";
import "./CSS/roomInfoCard.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import RoomDetailsCard from "../components/RoomDetailsCard";
import "chart.js/auto";

function RoomInfoCard({ data }) {
  RoomInfoCard.propTypes = {
    data: PropTypes.array.isRequired,
  };

  const [isPopupVisible, setPopupVisible] = useState(false);

  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide((slide + 1) % data.slides.length);
  };

  const prevSlide = () => {
    setSlide((slide - 1 + data.slides.length) % data.slides.length);
  };

  return (
    <Container>
      <div className="block-02">
        <div className="carousel-02">
          <BsArrowLeftCircleFill
            className="arrow-02 arrow-left-02"
            onClick={prevSlide}
          />
          {data.slides.map((item, idx) => {
            return (
              <img
                src={item.src}
                alt={item.alt}
                key={idx}
                className={
                  slide === idx ? "slide-02" : "slide-02 slide-hidden-02"
                }
              />
            );
          })}
          <BsArrowRightCircleFill
            className="arrow-02 arrow-right-02"
            onClick={nextSlide}
          />
        </div>

        <div className="info-02">
          <div>
            <ul className="u-list-02">
              <li>Comfy beds, 8,5 - Based on 425 reviews</li>
              <li>Room Size: 23m</li>
              <li>Price: 100$</li>
              <li>Free toiletries</li>
            </ul>
          </div>
          <div className="buttons-02">
            <button
              className="button-02"
              onClick={() => setPopupVisible(!isPopupVisible)}
            >
              Information
            </button>
            <button className="button-02">Book</button>
          </div>
        </div>
      </div>

      {isPopupVisible && (
        <div className="popup-container-02">
          <div className="popup-content-02">
            <button
              className="button-02"
              onClick={() => setPopupVisible(false)}
            >
              X
            </button>
            <RoomDetailsCard />
          </div>
        </div>
      )}
    </Container>
  );
}

export default RoomInfoCard;

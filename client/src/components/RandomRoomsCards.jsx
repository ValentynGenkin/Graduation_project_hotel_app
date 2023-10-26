import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./CSS/RandomRoomsCards.css";

const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  700: { items: 2 },
  1024: { items: 3 },
};

const RandomRoomsCard = () => {
  const items = [
    <div className="main-screen-card-item" data-value="1" key={"1"}>
      <img src="assets/room1.jpg" alt="" className="main-screen-card-img" />
      <Button
        className="main-screen-cars-btn"
        variant="info"
        as={Link}
        to={"/"}
      >
        Book!
      </Button>
    </div>,
    <div className="main-screen-card-item" data-value="2" key={"2"}>
      <img src="assets/room2.jpg" alt="" className="main-screen-card-img" />
      <Button
        className="main-screen-cars-btn"
        variant="info"
        as={Link}
        to={"/"}
      >
        Book!
      </Button>
    </div>,
    <div className="main-screen-card-item" data-value="3" key={"3"}>
      <img src="assets/room3.jpg" alt="" className="main-screen-card-img" />
      <Button
        className="main-screen-cars-btn"
        variant="info"
        as={Link}
        to={"/"}
      >
        Book!
      </Button>
    </div>,
    <div className="main-screen-card-item" data-value="4" key={"4"}>
      <img src="assets/room4.jpg" alt="" className="main-screen-card-img" />
      <Button
        className="main-screen-cars-btn"
        variant="info"
        as={Link}
        to={"/"}
      >
        Book!
      </Button>
    </div>,
    <div className="main-screen-card-item" data-value="4" key={"5"}>
      <img src="assets/room1.jpg" alt="" className="main-screen-card-img" />
      <Button
        className="main-screen-cars-btn"
        variant="info"
        as={Link}
        to={"/"}
      >
        Book!
      </Button>
    </div>,
  ];

  return (
    <Container className="random-cards-container">
      <hr />
      <h2 className="random-cards-title">Available rooms, check Your dates:</h2>
      <AliceCarousel
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
        disableDotsControls
      />
      <hr />
    </Container>
  );
};

export default RandomRoomsCard;
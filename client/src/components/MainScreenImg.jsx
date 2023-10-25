import React from "react";
import { Container } from "react-bootstrap";

import "./CSS/MainScreenImg.css";

const MainScreenImg = () => {
  return (
    <Container className="main-screen-img-container">
      <img
        src="../assets/MainScreenImg.jpg"
        alt="hotel-photo"
        className="main-screen-img"
      />
    </Container>
  );
};

export default MainScreenImg;

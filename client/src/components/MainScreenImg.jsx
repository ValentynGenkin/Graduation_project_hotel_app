import React from "react";
import { Container } from "react-bootstrap";
import ImageSource from "../assets/MainScreenImg.jpg";

import "./CSS/MainScreenImg.css";

const MainScreenImg = () => {
  return (
    <Container className="main-screen-img-container">
      <img src={ImageSource} alt="hotel-photo" className="main-screen-img" />
    </Container>
  );
};

export default MainScreenImg;

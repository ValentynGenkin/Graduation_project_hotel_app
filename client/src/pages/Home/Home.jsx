import React from "react";
import MainScreenImg from "../../components/MainScreenImg";
import RandomRoomsCard from "../../components/RandomRoomsCards";
import RoomSearchBlock from "../../components/RoomSearchBlock";
import { Container } from "react-bootstrap";
import "../../components/CSS/mainScreenContainer.css";
import BookingCart from "../../components/BookingCart";
const Home = () => {
  return (
    <>
      <BookingCart />
      <Container className="main-screen-container">
        <MainScreenImg />
        <RoomSearchBlock />
        <RandomRoomsCard />
      </Container>
    </>
  );
};

export default Home;

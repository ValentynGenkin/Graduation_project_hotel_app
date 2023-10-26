import React from "react";
import MainScreenImg from "../../components/MainScreenImg";
import RandomRoomsCard from "../../components/RandomRoomsCards";
import RoomSearchBlock from "../../components/RoomSearchBlock";

const Home = () => {
  return (
    <>
      <MainScreenImg />
      <RoomSearchBlock />
      <RandomRoomsCard />
    </>
  );
};

export default Home;

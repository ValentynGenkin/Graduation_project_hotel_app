import React from "react";
import RoomsTimeTable from "../Component/RoomsTimeTable";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { Container } from "react-bootstrap";

const Status = () => {
  return (
    <>
      <Navbar />

      <Container>
        <RoomsTimeTable />
      </Container>
      <Footer />
    </>
  );
};

export default Status;

import React from "react";
import Requests from "../Component/Requests";
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
        <Requests />
      </Container>
      <Footer />
    </>
  );
};

export default Status;

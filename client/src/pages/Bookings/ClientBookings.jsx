import React from "react";
import { Container } from "react-bootstrap";
import "../../components/CSS/ClientBookings.css";

import BookingRequestSender from "../../components/BookingRequestSender";
import ClientBookingItem from "../../components/ClientBookingItem";

const ClientBookings = () => {
  return (
    <Container className="client-booking-container">
      <ClientBookingItem requestBlok={<BookingRequestSender />} />

      <ClientBookingItem />
    </Container>
  );
};

export default ClientBookings;

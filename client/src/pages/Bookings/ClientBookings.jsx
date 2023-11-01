import React from "react";
import { Container } from "react-bootstrap";
import "../../components/CSS/ClientBookings.css";

import BookingRequestSender from "../../components/BookingRequestSender";
import ClientBookingItem from "../../components/ClientBookingItem";
import BookingControlBtn from "../../components/BookingControlBtn";

const ClientBookings = () => {
  return (
    <Container className="client-booking-container">
      <ClientBookingItem
        requestBlok={<BookingRequestSender />}
        bookingControl={<BookingControlBtn />}
      />
      <h4>Booking history:</h4>
      <ClientBookingItem />
    </Container>
  );
};

export default ClientBookings;

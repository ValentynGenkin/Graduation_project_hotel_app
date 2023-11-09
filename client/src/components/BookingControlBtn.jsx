import React from "react";
import { Button } from "react-bootstrap";

const BookingControlBtn = () => {
  return (
    <div className="client-bookings-btn-block">
      <Button variant="danger">Cancel booking</Button>
      <Button variant="secondary">Contact with Hotel</Button>
    </div>
  );
};

export default BookingControlBtn;

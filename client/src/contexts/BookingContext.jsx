import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const BookingContext = createContext();

export function useBookingContext() {
  const [bookingContext, setBookingContext] = useState(
    localStorage.getItem("booking")
      ? JSON.parse(localStorage.getItem("booking"))
      : {}
  );

  const handleBookingContext = () => {
    const booking = localStorage.getItem("booking")
      ? JSON.parse(localStorage.getItem("booking"))
      : {};
    setBookingContext(booking);
  };
  return { bookingContext, handleBookingContext };
}

export function BookingContextProvider({ children }) {
  BookingContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const { bookingContext, handleBookingContext } = useBookingContext();

  return (
    <BookingContext.Provider value={{ bookingContext, handleBookingContext }}>
      {children}
    </BookingContext.Provider>
  );
}

import React, { createContext, useState } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
export const BookingContext = createContext();

export function useBookingContext() {
  const [bookingContext, setBookingContext] = useState();

  const handleBookingContext = () => {
    const booking = JSON.parse(Cookies.get("booking"));
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

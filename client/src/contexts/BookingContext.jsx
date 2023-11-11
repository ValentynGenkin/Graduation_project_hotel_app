import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";

export const BookingContext = createContext();

export function useBookingContext() {
  const bookingCookie = localStorage.getItem("booking");
  const [bookingContext, setBookingContext] = useState(
    bookingCookie ? JSON.parse(bookingCookie) : {}
  );
  const { performFetch } = useFetch(
    `/booking/bookingDetail/status/${
      bookingCookie ? JSON.parse(bookingCookie)._id : ""
    }`,
    (response) => {
      if (response.success === true) {
        setBookingContext(response.booking);
        localStorage.setItem("booking", JSON.stringify(response.booking));
      }
    }
  );
  useEffect(() => {
    if (bookingCookie) {
      performFetch();
    }
  }, []);
  const handleBookingContext = () => {
    const booking = bookingCookie ? JSON.parse(bookingCookie) : {};
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

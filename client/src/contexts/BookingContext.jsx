import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import Cookies from "js-cookie";
export const BookingContext = createContext(
  localStorage.getItem("booking")
    ? JSON.parse(localStorage.getItem("booking"))
    : {}
);

export function useBookingContext() {
  const bookingCookie = Cookies.get("booking")
    ?.split(":")[1]
    .replace(/['"]+/g, "");

  const [bookingContext, setBookingContext] = useState(
    bookingCookie ? JSON.parse(localStorage.getItem("booking")) : {}
  );
  const { performFetch } = useFetch(
    `/booking/bookingDetail/status/${bookingCookie ? bookingCookie : ""}`,
    (response) => {
      if (response.success === true) {
        setBookingContext(response.booking);
        if (response.booking.bookingDetails.length === 0) {
          Cookies.remove("booking");
        }
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
    performFetch();
    setBookingContext(JSON.parse(localStorage.getItem("booking")));
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

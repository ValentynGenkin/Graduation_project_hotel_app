import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import Cookies from "js-cookie";

export const AdminBookingContext = createContext({
  AdminbookingContext: {},
  handleBookingContext: () => {},
});

export function useBookingContext() {
  const bookingCookie = Cookies.get("booking")
    ?.split(":")[1]
    .replace(/['"]+/g, "");

  const [bookingContext, setBookingContext] = useState(
    bookingCookie ? JSON.parse(localStorage.getItem("booking")) : {}
  );

  const { performFetch } = useFetch(
    `/booking/bookingDetail/status/${bookingCookie ? bookingCookie : "no-id"}`,
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

  const handleBookingContext = async () => {
    await performFetch();
    setBookingContext(JSON.parse(localStorage.getItem("booking")));
  };

  return { bookingContext, handleBookingContext };
}

export function AdminBookingContextProvider({ children }) {
  AdminBookingContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const { bookingContext, handleBookingContext } = useBookingContext();

  return (
    <AdminBookingContext.Provider
      value={{ bookingContext, handleBookingContext }}
    >
      {children}
    </AdminBookingContext.Provider>
  );
}

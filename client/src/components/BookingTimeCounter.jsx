import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BookingContext } from "../contexts/BookingContext";
import "./CSS/BookingCart.css";

const BookingTimeCounter = ({ updatedAt }) => {
  BookingTimeCounter.propTypes = {
    updatedAt: PropTypes.string,
  };
  const targetDate = updatedAt
    ? new Date(new Date(updatedAt).getTime() + 15 * 60000)
    : null;

  const [timeLeft, setTimeLeft] = useState("");
  const { handleBookingContext } = useContext(BookingContext);

  useEffect(() => {
    if (updatedAt) {
      const interval = setInterval(() => {
        const now = new Date();
        const difference = targetDate - now;

        if (difference >= 0) {
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          setTimeLeft(`${minutes} : ${seconds}`);
        } else {
          handleBookingContext();
          clearInterval(interval);
          setTimeLeft("Time is up!");
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setTimeLeft("");
    }
  }, [updatedAt, targetDate, handleBookingContext]);
  return (
    <div>
      <p className="time-left-03"> {timeLeft}</p>
    </div>
  );
};

export default BookingTimeCounter;

import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BookingContext } from "../contexts/BookingContext";
import "./CSS/BookingCart.css";

const BookingTimeCounter = ({ createdAt }) => {
  BookingTimeCounter.propTypes = {
    createdAt: PropTypes.string.isRequired,
  };
  const targetDate = new Date(new Date(createdAt).getTime() + 15 * 60000);

  const [timeLeft, setTimeLeft] = useState("");
  const { handleBookingContext } = useContext(BookingContext);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`${minutes} : ${seconds} `);

      if (difference < 0) {
        handleBookingContext();
        clearInterval(interval);
        setTimeLeft("'Time is up!'");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);
  return (
    <div>
      <p className="time-left-03"> {timeLeft}</p>
    </div>
  );
};

export default BookingTimeCounter;

import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BookingContext } from "../contexts/BookingContext";

const BookingTimeCounter = ({ createdAt }) => {
  BookingTimeCounter.propTypes = {
    createdAt: PropTypes.string.isRequired,
  };
  const targetDate = createdAt
    ? new Date(new Date(createdAt).getTime() + 15 * 60000)
    : null;

  const [timeLeft, setTimeLeft] = useState("");
  const { handleBookingContext } = useContext(BookingContext);

  useEffect(() => {
    if (createdAt) {
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
  }, [createdAt, targetDate, handleBookingContext]);
  return (
    <div>
      <p> {timeLeft}</p>
    </div>
  );
};

export default BookingTimeCounter;

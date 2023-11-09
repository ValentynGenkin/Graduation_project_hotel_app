import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import { BookingContext } from "../contexts/BookingContext";
import PropTypes from "prop-types";

const RemoveRoomFromBookingButton = ({
  roomId,
  bookingDetailId,
  className,
}) => {
  RemoveRoomFromBookingButton.propTypes = {
    roomId: PropTypes.string.isRequired,
    bookingDetailId: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
  };
  const { handleBookingContext } = useContext(BookingContext);

  const { isLoading, error, performFetch } = useFetch(
    "/booking/removeRoomFromBooking",
    (response) => {
      if (response.success === true) {
        localStorage.setItem("booking", JSON.stringify(response.booking));
        handleBookingContext();
      }
    }
  );
  const handleClick = (event) => {
    event.preventDefault();

    performFetch({
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: roomId,
        bookingDetailId: bookingDetailId,
      }),
    });
  };

  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : error ? (
        <>
          <p>Something went wrong. Error:{error.toString()}</p>
          <button className={className} onClick={handleClick}>
            Remove Room Button
          </button>
        </>
      ) : (
        <button className={className} onClick={handleClick}>
          Remove Room Button
        </button>
      )}
    </>
  );
};

export default RemoveRoomFromBookingButton;

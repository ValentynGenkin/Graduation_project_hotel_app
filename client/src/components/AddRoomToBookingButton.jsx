import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import { BookingContext } from "../contexts/BookingContext";
import PropTypes from "prop-types";

const AddRoomToBookingButton = ({ roomId, checkIn, checkOut, className }) => {
  AddRoomToBookingButton.propTypes = {
    roomId: PropTypes.string.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
  };
  const { handleBookingContext } = useContext(BookingContext);

  const { isLoading, error, performFetch } = useFetch(
    "/booking/addRoomToBooking",
    (response) => {
      if (response.success === true) {
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
        checkIn: checkIn,
        checkOut: checkOut,
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
            Add Room Button
          </button>
        </>
      ) : (
        <button className={className} onClick={handleClick}>
          Add Room Button
        </button>
      )}
    </>
  );
};

export default AddRoomToBookingButton;

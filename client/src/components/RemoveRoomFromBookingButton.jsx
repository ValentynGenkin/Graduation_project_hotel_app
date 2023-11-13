import React, { useContext, useEffect, useState } from "react";
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
  const [clickEvent, setClickEvent] = useState();

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/booking/removeRoomFromBooking",
    (response) => {
      if (response.success === true) {
        localStorage.setItem("booking", JSON.stringify(response.booking));
        handleBookingContext();
      }
    }
  );
  const handleClick = () => {
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
  useEffect(() => {
    if (clickEvent) {
      handleClick();
    }
    return () => {
      cancelFetch();
    };
  }, [clickEvent]);
  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : error ? (
        <>
          <p>Something went wrong. Error:{error.toString()}</p>
          <button
            className={className}
            onClick={() => setClickEvent(new Date())}
          >
            Remove
          </button>
        </>
      ) : (
        <button className={className} onClick={() => setClickEvent(new Date())}>
          Remove
        </button>
      )}
    </>
  );
};

export default RemoveRoomFromBookingButton;

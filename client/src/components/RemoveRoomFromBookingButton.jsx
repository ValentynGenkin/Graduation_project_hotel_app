import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { BookingContext } from "../contexts/BookingContext";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";

const RemoveRoomFromBookingButton = ({
  roomId,
  bookingDetailId,
  className,
}) => {
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
      {error ? (
        <>
          <p>Something went wrong. Error:{error.toString()}</p>
          <button
            className={className}
            onClick={() => setClickEvent(new Date())}
          >
            {isLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "X"
            )}
          </button>
        </>
      ) : (
        <button className={className} onClick={() => setClickEvent(new Date())}>
          {isLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "X"
          )}
        </button>
      )}
    </>
  );
};

export default RemoveRoomFromBookingButton;

RemoveRoomFromBookingButton.propTypes = {
  roomId: PropTypes.string.isRequired,
  bookingDetailId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

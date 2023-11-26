import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { BookingContext } from "../contexts/BookingContext";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";

const AddRoomToBookingButton = ({
  textContent,
  roomId,
  checkIn,
  checkOut,
  className,
}) => {
  const { handleBookingContext } = useContext(BookingContext);
  const [clickEvent, setClickEvent] = useState();

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/booking/addRoomToBooking",
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
        checkIn: checkIn,
        checkOut: checkOut,
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
            ) : textContent ? (
              textContent
            ) : (
              "Add Rooms"
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
          ) : textContent ? (
            textContent
          ) : (
            "Add Rooms"
          )}
        </button>
      )}
    </>
  );
};

export default AddRoomToBookingButton;

AddRoomToBookingButton.propTypes = {
  roomId: PropTypes.string.isRequired,
  checkIn: PropTypes.string.isRequired,
  checkOut: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  textContent: PropTypes.string,
};

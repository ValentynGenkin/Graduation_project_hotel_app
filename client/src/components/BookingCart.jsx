import React, { useContext } from "react";
import { BookingContext } from "../contexts/BookingContext";
import { getDayDifference } from "../util/dateHelper";
import "./CSS/BookingCart.css";
import RemoveRoomFromBookingButton from "./RemoveRoomFromBookingButton";
import BookingTimeCounter from "./BookingTimeCounter";
const BookingCart = () => {
  const { bookingContext } = useContext(BookingContext);

  const cartItems = bookingContext?.bookingDetails
    ? bookingContext.bookingDetails.map((bookingDetail) => {
        const dayDiff = getDayDifference(
          new Date(bookingDetail.checkIn),
          new Date(bookingDetail.checkOut)
        );
        return (
          <div key={bookingDetail._id} className="cart-booking-detail">
            <RemoveRoomFromBookingButton
              className="remove-room-button-in-cart"
              roomId={bookingDetail.roomId._id}
              bookingDetailId={bookingDetail._id}
            />
            <p>Room Number: {bookingDetail.roomId.roomNo}</p>
            <p>Room Type: {bookingDetail.roomId.roomType}</p>
            <p>Bed Count: {bookingDetail.roomId.bedCount}</p>
            <p>
              Room Cost:{" "}
              {`${dayDiff} night(s) x ${
                bookingDetail.roomId.roomPrice.$numberDecimal
              } / per night = ${
                dayDiff *
                parseFloat(bookingDetail.roomId.roomPrice.$numberDecimal)
              }`}
            </p>
            <BookingTimeCounter createdAt={bookingDetail.createdAt} />
          </div>
        );
      })
    : [];

  return (
    <div
      className="cart-container"
      style={{
        display: `${
          bookingContext?.bookingDetails?.length === 0 ? "none" : "block"
        }`,
      }}
    >
      <div className="cart-button">
        <BookingTimeCounter
          createdAt={bookingContext?.bookingDetails?.reduce(
            (accumulator, bookingDetail) =>
              (accumulator =
                new Date(bookingDetail.createdAt) <
                new Date(accumulator ? accumulator : "2100-01-01T00:00:00")
                  ? bookingDetail.createdAt
                  : accumulator),
            null
          )}
        />
      </div>
      <div className="cart-details">{cartItems}</div>
    </div>
  );
};

export default BookingCart;

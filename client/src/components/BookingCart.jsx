import React, { useContext } from "react";
import { BookingContext } from "../contexts/BookingContext";
import "./CSS/BookingCart.css";
import RemoveRoomFromBookingButton from "./RemoveRoomFromBookingButton";
import BookingTimeCounter from "./BookingTimeCounter";
import { BsBox2Heart } from "react-icons/bs";
const BookingCart = () => {
  const { bookingContext } = useContext(BookingContext);

  const cartItems = bookingContext?.bookingDetails
    ? bookingContext.bookingDetails.map((bookingDetail) => {
        const diffInDays = Math.floor(
          (new Date(bookingDetail.checkOut) - new Date(bookingDetail.checkIn)) /
            (1000 * 60 * 60 * 24)
        );
        return (
          <div key={bookingDetail._id} className="cart-booking-detail">
            <RemoveRoomFromBookingButton
              className="remove-room-button-in-cart"
              roomId={bookingDetail.roomId._id}
              bookingDetailId={bookingDetail._id}
            />
            <ul>
              <li>Room Number: {bookingDetail.roomId.roomNo}</li>
              <li>Room Type: {bookingDetail.roomId.roomType}</li>
              <li>Bed Count: {bookingDetail.roomId.bedCount}</li>
              <li>
                Room Cost:{" "}
                {`${diffInDays} night(s) x ${
                  bookingDetail.roomId.roomPrice.$numberDecimal
                } / per night = ${
                  diffInDays *
                  parseFloat(bookingDetail.roomId.roomPrice.$numberDecimal)
                }`}
              </li>
            </ul>

            <BookingTimeCounter
              updatedAt={bookingContext && bookingContext.updatedAt}
            />
          </div>
        );
      })
    : [];

  return (
    <div className="cart-container">
      <div
        style={{
          display: `${
            bookingContext && bookingContext.bookingDetails
              ? bookingContext.bookingDetails.length === 0
                ? "none"
                : "flex"
              : "none"
          }`,
        }}
        className="cart-button"
      >
        <BsBox2Heart className="box-icon-03" />
        <BookingTimeCounter
          updatedAt={bookingContext && bookingContext.updatedAt}
        />
      </div>
      <div className="cart-details">{cartItems}</div>
    </div>
  );
};

export default BookingCart;

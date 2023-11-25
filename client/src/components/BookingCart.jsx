import React, { useContext } from "react";
import { BookingContext } from "../contexts/BookingContext";
import "./CSS/BookingCart.css";
import RemoveRoomFromBookingButton from "./RemoveRoomFromBookingButton";
import BookingTimeCounter from "./BookingTimeCounter";
import { Badge, Button } from "react-bootstrap";
import { dateFormatter } from "../util/dateFormatter";
import { totalPriceAndNightsCalculator } from "../util/totalPriceAndNightsCalculator";
import TimerImg from "../assets/schedule.png";
import { Link } from "react-router-dom";
const BookingCart = () => {
  const { bookingContext } = useContext(BookingContext);

  const cartItems = bookingContext?.bookingDetails
    ? bookingContext.bookingDetails.map((bookingDetail) => {
        return (
          <div key={bookingDetail._id} className="cart-booking-detail">
            <div className="cart-booking-detail-info">
              <p>{`Check-in: ${dateFormatter(
                new Date(bookingDetail.checkIn)
              )}`}</p>
              <p>{`Check-out: ${dateFormatter(
                new Date(bookingDetail.checkOut)
              )}`}</p>
              <p>Room Type: {bookingDetail.roomId.roomType}</p>
              <p>
                {" "}
                {`Price for 1 room for ${
                  totalPriceAndNightsCalculator(
                    bookingDetail.roomId.roomPrice.$numberDecimal,
                    bookingDetail.checkIn,
                    bookingDetail.checkOut
                  )[1]
                } ${
                  totalPriceAndNightsCalculator(
                    bookingDetail.roomId.roomPrice.$numberDecimal,
                    bookingDetail.checkIn,
                    bookingDetail.checkOut
                  )[1] > 1
                    ? "nights"
                    : "night"
                }:
                            €${
                              totalPriceAndNightsCalculator(
                                bookingDetail.roomId.roomPrice.$numberDecimal,
                                bookingDetail.checkIn,
                                bookingDetail.checkOut
                              )[0]
                            }`}
              </p>
            </div>
            <div>
              <RemoveRoomFromBookingButton
                className="btn  btn-danger delete-room-btn-cart"
                roomId={bookingDetail.roomId._id}
                bookingDetailId={bookingDetail._id}
              />
            </div>
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
        <Badge bg="secondary">
          {bookingContext && bookingContext.bookingDetails
            ? `${bookingContext.bookingDetails.length} ${
                bookingContext.bookingDetails.length > 1
                  ? "rooms are ready for booking"
                  : "room is ready for booking"
              }`
            : null}
        </Badge>
        <br />
        <Button
          variant="primary"
          className="checkout-cart-btn"
          as={Link}
          to={"/checkout"}
        >
          Book <span className="visually-hidden">unread messages</span>
        </Button>
        {bookingContext && bookingContext.updatedAt ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={TimerImg}
              alt="timer"
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            <BookingTimeCounter
              updatedAt={bookingContext && bookingContext.updatedAt}
            />
          </div>
        ) : null}
      </div>

      <div className="cart-details">{cartItems}</div>
    </div>
  );
};

export default BookingCart;

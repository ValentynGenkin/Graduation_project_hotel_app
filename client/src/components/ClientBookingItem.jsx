import React from "react";
import { Carousel, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { dateFormatter } from "../util/dateFormatter";

const ClientBookingItem = ({ requestBlok, bookingControl, data }) => {
  return (
    <Container className="client-booking-item">
      <div className="booking-date-information">
        <div>
          <span>Check-in: </span>

          <span>{`${dateFormatter(new Date(data.checkIn))} 14:00`}</span>
        </div>
        <div>
          <span>Check-out: </span>

          <span>{`${dateFormatter(new Date(data.checkOut))}  12:00`}</span>
        </div>
      </div>

      {bookingControl}

      <div className="bookings-description-block">
        <div className="bookings-img-carousel">
          <Carousel indicators={false}>
            {data.roomId.images.map((img) => (
              <Carousel.Item key={img}>
                <img
                  src={img}
                  alt="Room photo"
                  className="checkout-carousel-img"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="bookings-description">
          <h6>{data.roomId.roomDescription}</h6>
          <ul>
            {data.roomId.facilities.map((li) => (
              <li key={li}>{li}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="booking-information-block">
        <div>
          <span>Booking ID: </span>

          <span>{data.bookingId}</span>
        </div>
        <div>
          <span>Amount: </span>

          <span>{data.roomId.roomPrice.$numberDecimal}</span>
        </div>
        <div>
          <span>Room number: </span>

          <span>{data.roomId.roomNo}</span>
        </div>
        <div>
          <span>Booking status: </span>

          <span>Confirmed</span>
        </div>
      </div>

      {requestBlok}
    </Container>
  );
};

export default ClientBookingItem;

ClientBookingItem.propTypes = {
  requestBlok: PropTypes.element,
  bookingControl: PropTypes.element,
  data: PropTypes.object.isRequired,
};

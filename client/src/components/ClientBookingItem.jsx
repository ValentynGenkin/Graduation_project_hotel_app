import React from "react";
import { Carousel, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { dateFormatter } from "../util/dateFormatter";

const ClientBookingItem = ({ requestBlok, bookingControl, data }) => {
  const totalAmount = (bookingDetail) => {
    let totalCost = 0;
    const roomPrice = parseFloat(bookingDetail.roomId.roomPrice.$numberDecimal);
    const checkInDate = new Date(bookingDetail.checkIn);
    const checkOutDate = new Date(bookingDetail.checkOut);

    checkInDate.setUTCHours(14, 0, 0, 0);
    checkOutDate.setUTCHours(12, 0, 0, 0);

    const timeCorrection = 2 * 60 * 60 * 1000;
    const numberOfNights = Math.ceil(
      (checkOutDate - checkInDate - timeCorrection) / (1000 * 60 * 60 * 24)
    );

    const roomCost = numberOfNights * roomPrice;
    return (totalCost += roomCost);
  };

  return (
    <Container className="client-booking-item">
      <div className="booking-date-information"></div>
      {bookingControl}
      <div className="bookings-description-block">
        <div className="bookings-img-carousel">
          <Carousel
            indicators={false}
            interval={null}
            className="booking-carousel"
          >
            {data.roomId.images.map((img) => (
              <Carousel.Item key={img}>
                <img
                  src={img}
                  alt="Room photo"
                  className="booking-carousel-img"
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

        <div className="booking-information-block">
          <div>
            <p className="booking-info-title">Check-in: </p>

            <p className="booking-info-value">{`${dateFormatter(
              new Date(data.checkIn)
            )} 14:00`}</p>
          </div>
          <div>
            <p className="booking-info-title">Check-out: </p>

            <p className="booking-info-value">{`${dateFormatter(
              new Date(data.checkOut)
            )}  12:00`}</p>
          </div>
          <div>
            <p className="booking-info-title">Room type: </p>

            <p className="booking-info-value">{data.roomId.roomType}</p>
          </div>
          <div>
            <p className="booking-info-title">Room number: </p>

            <p className="booking-info-value">{data.roomId.roomNo}</p>
          </div>
          <div>
            <p className="booking-info-title">Total amount: </p>

            <p className="booking-info-value">€ {totalAmount(data)}</p>
          </div>

          <div>
            <p className="booking-info-title">Booking status: </p>

            <p className="booking-info-value">{data.status}</p>
          </div>
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

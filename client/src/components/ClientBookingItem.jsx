import React from "react";
import { Carousel, Container } from "react-bootstrap";
import PropTypes from "prop-types";

const ClientBookingItem = ({ requestBlok, bookingControl, data }) => {
  return (
    <Container className="client-booking-item">
      <div className="booking-date-information">
        <div>
          <span>Check-in: </span>

          <span>12.11.2023 14:00</span>
        </div>
        <div>
          <span>Check-out: </span>

          <span>15.11.2023 12:00{data}</span>
        </div>
      </div>

      {bookingControl}

      <div className="bookings-description-block">
        <div className="bookings-img-carousel">
          <Carousel indicators={false}>
            {/* {item.roomId.images.map((img) => (
              <Carousel.Item key={img}>
                <img
                  src={img}
                  alt="Room photo"
                  className="checkout-carousel-img"
                />
              </Carousel.Item>
            ))} */}
          </Carousel>
        </div>
        <div className="bookings-description">
          <h5>Room facilities:</h5>
          <h6>
            This air-conditioned double room features a private bathroom, a
            private entrance and a tea and coffee maker.
          </h6>
          <ul>
            <li>Refrigerator</li>
            <li>Safety deposit box</li>
            <li>Hardwood or parquet floors</li>
            <li>Air conditioning</li>
            <li>Seating Area</li>
            <li>
              <b>Smoking:</b> No smoking
            </li>
          </ul>
        </div>
      </div>
      <div className="booking-information-block">
        <div>
          <span>Booking ID: </span>

          <span>165168165</span>
        </div>
        <div>
          <span>Amount: </span>

          <span>270.00 euro</span>
        </div>
        <div>
          <span>Payment method: </span>

          <span>iDeal</span>
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

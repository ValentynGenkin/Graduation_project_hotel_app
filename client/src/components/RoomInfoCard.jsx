import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch.js";
import "./CSS/roomInfoCard.css";
import {
  Accordion,
  Button,
  Card,
  Carousel,
  Container,
  Spinner,
  useAccordionButton,
} from "react-bootstrap";
import "chart.js/auto";
import { Link, useLocation } from "react-router-dom";
import AddRoomToBookingButton from "../components/AddRoomToBookingButton";
import RoomFilterCheckBoxes from "./RoomFilterCheckBoxes.jsx";
import BookingCart from "./BookingCart.jsx";
import { formatDateString } from "../util/formatDateString.js";
import SearchResultsSearchBLock from "./SearchResultsSearchBlock.jsx";
import FullScreenPopUp from "./FullScreenPopUp.jsx";
import { BookingContext } from "../contexts/BookingContext.jsx";
import PropTypes from "prop-types";

function RoomInfoCard() {
  const [response, setResponse] = useState(null);

  const [filters, setFilters] = useState({
    roomType: null,
    facilities: null,
    bedCount: null,
  });

  const { bookingContext } = useContext(BookingContext);

  const queryParams = new URLSearchParams(useLocation().search);

  let checkIn = formatDateString(queryParams.get("checkIn"));
  let checkOut = formatDateString(queryParams.get("checkOut"));

  checkIn = new Date(checkIn).toString();
  checkOut = new Date(checkOut).toString();

  const { isLoading, error, performFetch } = useFetch(
    `/rooms?checkIn=${checkIn}&checkOut=${checkOut}&roomType=${
      filters.roomType ? filters.roomType : ""
    }&facilities=${filters.facilities ? filters.facilities : ""}&bedCount=${
      filters.bedCount ? filters.bedCount : ""
    }`,
    (response) => {
      setResponse(response);

      const initialIdx = {};
      response.rooms.forEach((room) => {
        initialIdx[room.exampleRoom._id] = 0;
      });
    }
  );

  useEffect(() => {
    performFetch({
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
  }, [filters]);

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
      <Button variant="light" onClick={decoratedOnClick}>
        {children}
      </Button>
    );
  }

  const totalPriceAndNights = (price) => {
    let totalCost = 0;

    const roomPrice = parseFloat(price);
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    checkInDate.setUTCHours(14, 0, 0, 0);
    checkOutDate.setUTCHours(12, 0, 0, 0);

    const timeCorrection = 2 * 60 * 60 * 1000;
    const numberOfNights = Math.ceil(
      (checkOutDate - checkInDate - timeCorrection) / (1000 * 60 * 60 * 24)
    );

    const roomCost = numberOfNights * roomPrice;
    totalCost += roomCost;

    return [totalCost, numberOfNights];
  };

  return (
    <>
      <BookingCart />
      <Container className="room-info-card-container">
        <SearchResultsSearchBLock />
        <RoomFilterCheckBoxes setFilters={setFilters} />
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : response && response.rooms && response.rooms.length > 0 ? (
          response.rooms.map((room, index) => (
            <>
              <Accordion
                defaultActiveKey="1"
                className="search-results-accordion"
              >
                <Card>
                  <Card.Header className="search-results-card-header">
                    <div key={index} className="block-02">
                      <Carousel
                        interval={null}
                        indicators={false}
                        className="search-results-carousel"
                      >
                        {room.exampleRoom.images.map((img) => (
                          <Carousel.Item key={img}>
                            <img
                              id={room.exampleRoom._id}
                              src={img}
                              alt="Room photo"
                              className="search-results-carousel-img"
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                      <div className="search-results-card-info">
                        <div className="room-num">
                          <FullScreenPopUp
                            title={
                              <div>
                                <p>
                                  {`Room type: ${room.exampleRoom.roomType}`}
                                </p>
                              </div>
                            }
                            body={
                              <Carousel
                                interval={null}
                                indicators={false}
                                className="full-screen-carousel-zoomed"
                              >
                                {room.exampleRoom.images.map((img) => (
                                  <Carousel.Item key={img}>
                                    <img
                                      id={room.exampleRoom._id}
                                      src={img}
                                      alt="Room photo"
                                      className="search-results-carousel-img-zoomed"
                                    />
                                  </Carousel.Item>
                                ))}
                              </Carousel>
                            }
                          />

                          <p>
                            {`Only ${room.count} ${
                              room.count > 1 ? "rooms" : "room"
                            } left`}
                          </p>
                        </div>
                        <div>
                          <p className="search-results-card-info-title">
                            Room type:
                          </p>
                          <p className="search-results-card-info-value">
                            {room.exampleRoom.roomType}
                          </p>
                        </div>

                        <div>
                          <p className="search-results-card-info-title">Bed:</p>
                          <p className="search-results-card-info-value">
                            {room.exampleRoom.roomType === "Single"
                              ? "One single ben"
                              : "Two single beds or large double bed "}
                          </p>
                        </div>
                        <div>
                          <p className="search-results-card-info-title">
                            Price per night:
                          </p>
                          <p className="search-results-card-info-value">
                            €{room.exampleRoom.roomPrice.$numberDecimal}
                          </p>
                        </div>
                      </div>

                      <div className="search-results-card-buttons">
                        <CustomToggle eventKey="0">Information</CustomToggle>
                        <AddRoomToBookingButton
                          checkIn={checkIn}
                          checkOut={checkOut}
                          roomId={room.exampleRoom._id}
                          className="btn btn-light"
                        />
                        {bookingContext &&
                        bookingContext.bookingDetails &&
                        bookingContext.bookingDetails.length > 0 ? (
                          <Button as={Link} to={"/checkout"} variant="light">
                            Checkout
                          </Button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Card.Header>

                  <Accordion.Collapse eventKey="0">
                    <Card.Body className="search-results-card-body">
                      <div className="search-results-card-body-info">
                        <p style={{ textIndent: "30px", textAlign: "justify" }}>
                          Room Description: {room.exampleRoom.roomDescription}
                        </p>

                        <p>Facilities:</p>
                        <ul className="u-list-02">
                          {room.exampleRoom.facilities.map((facility, idx) => (
                            <li key={facility + idx}>{facility}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="search-results-card-body-price ">
                        <p>
                          {`Total price for ${
                            totalPriceAndNights(
                              room.exampleRoom.roomPrice.$numberDecimal
                            )[1]
                          } ${
                            totalPriceAndNights(
                              room.exampleRoom.roomPrice.$numberDecimal
                            )[1] > 1
                              ? "nights"
                              : "night"
                          }:
                            €${
                              totalPriceAndNights(
                                room.exampleRoom.roomPrice.$numberDecimal
                              )[0]
                            }`}
                        </p>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </>
          ))
        ) : (
          <p>
            No available rooms on that date.
            <br />
            Please choose another date.
          </p>
        )}
      </Container>
    </>
  );
}

export default RoomInfoCard;

RoomInfoCard.propTypes = {
  children: PropTypes.element,
  eventKey: PropTypes.number,
};

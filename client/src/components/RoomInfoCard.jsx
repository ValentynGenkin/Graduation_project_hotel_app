import React, { useState, useEffect } from "react";
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
import { useLocation } from "react-router-dom";
import AddRoomToBookingButton from "../components/AddRoomToBookingButton";
import RoomFilterCheckBoxes from "./RoomFilterCheckBoxes.jsx";
import BookingCart from "./BookingCart.jsx";
import { formatDateString } from "../util/formatDateString.js";
import SearchResultsSearchBLock from "./SearchResultsSearchBlock.jsx";
import FullScreenPopUp from "./FullScreenPopUp.jsx";
import PropTypes from "prop-types";
import SearchRecommendation from "./SearchRecommendation.jsx";
import { totalPriceAndNightsCalculator } from "../util/totalPriceAndNightsCalculator.js";

function RoomInfoCard() {
  const [response, setResponse] = useState(null);

  const [filters, setFilters] = useState({
    roomType: null,
    facilities: null,
    bedCount: null,
  });

  const queryParams = new URLSearchParams(useLocation().search);

  let checkIn = formatDateString(queryParams.get("checkIn"));
  let checkOut = formatDateString(queryParams.get("checkOut"));
  let roomCount = queryParams.get("roomCount");

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
      <Button
        variant="light"
        onClick={() => {
          decoratedOnClick();
        }}
      >
        {children}
      </Button>
    );
  }

  return (
    <>
      <BookingCart />
      <Container className="room-info-card-container">
        <SearchResultsSearchBLock />
        <RoomFilterCheckBoxes setFilters={setFilters} />
        {roomCount > 1 ? <SearchRecommendation filters={filters} /> : ""}
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : response && response.rooms && response.rooms.length > 0 ? (
          response.rooms.map((room, index) => (
            <div key={room.exampleRoom._id}>
              <Accordion
                key={room.exampleRoom._id}
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
                                  <Carousel.Item key={room.exampleRoom._id + 1}>
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
                              ? "One single bed"
                              : room.exampleRoom.roomType === "Suite"
                              ? "One single bed and one large double bed"
                              : "Two single beds or one large double bed"}
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
                          textContent={"Add room"}
                          checkIn={checkIn}
                          checkOut={checkOut}
                          roomId={room.exampleRoom._id}
                          className="btn btn-light"
                        />
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
                            totalPriceAndNightsCalculator(
                              room.exampleRoom.roomPrice.$numberDecimal,
                              checkIn,
                              checkOut
                            )[1]
                          } ${
                            totalPriceAndNightsCalculator(
                              room.exampleRoom.roomPrice.$numberDecimal,
                              checkIn,
                              checkOut
                            )[1] > 1
                              ? "nights"
                              : "night"
                          }:
                            €${
                              totalPriceAndNightsCalculator(
                                room.exampleRoom.roomPrice.$numberDecimal,
                                checkIn,
                                checkOut
                              )[0]
                            }`}
                        </p>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
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

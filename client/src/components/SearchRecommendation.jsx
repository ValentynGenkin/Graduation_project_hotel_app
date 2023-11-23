import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, useAccordionButton } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { BookingContext } from "../contexts/BookingContext";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { formatDateString } from "../util/formatDateString";
import { totalPriceAndNightsCalculator } from "../util/totalPriceAndNightsCalculator";
import AddRoomToBookingButton from "./AddRoomToBookingButton";

const SearchRecommendation = ({ filters }) => {
  const { bookingContext } = useContext(BookingContext);
  const [response, setResponse] = useState(null);

  const queryParams = new URLSearchParams(useLocation().search);
  let checkIn = formatDateString(queryParams.get("checkIn"));
  let checkOut = formatDateString(queryParams.get("checkOut"));
  let personCount = queryParams.get("personCount");
  let roomCount = queryParams.get("roomCount");

  checkIn = new Date(checkIn).toString();
  checkOut = new Date(checkOut).toString();

  const { performFetch } = useFetch(
    `/rooms?checkIn=${checkIn}&checkOut=${checkOut}&roomType=${
      filters.roomType ? filters.roomType : ""
    }&facilities=${filters.facilities ? filters.facilities : ""}&bedCount=${
      filters.bedCount ? filters.bedCount : ""
    }&personCount=${roomCount === 1 ? "" : personCount}&roomCount=${
      roomCount === 1 ? "" : roomCount
    }`,
    (response) => {
      setResponse(processRoomBundles(response.rooms));
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
  const processRoomBundles = (roomBundles) => {
    return roomBundles.map((bundle) => {
      // Group by room type and bed count, and calculate total price.
      const roomSummary = bundle.reduce((acc, room) => {
        const key = `${room._id.roomType} - ${room._id.bedCount} beds`;
        if (!acc[key]) {
          acc[key] = {
            _id: room.exampleRoom._id,
            roomType: room._id.roomType,
            bedCount: room._id.bedCount,
            count: 0,
            total: 0,
            price: parseFloat(room._id.roomPrice["$numberDecimal"]),
            description: room.exampleRoom.roomDescription,
            facilities: room._id.facilities.join(", "),
            images: room.exampleRoom.images,
          };
        }
        acc[key].count += 1;
        acc[key].total += acc[key].price;
        return acc;
      }, {});

      // Convert the summary object back to an array.
      return Object.values(roomSummary);
    });
  };

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
      <Button
        className="more-results-btn"
        variant="outline-secondary"
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
      <h4>Recommended for {`${personCount}`} guests</h4>
      <Accordion defaultActiveKey="1" className="recommended-results-accordion">
        <Card>
          <Card.Header className="recommended-results-card">
            {[
              response && response[0] ? response[0] : null,
              response && response[0] ? response[1] : null,
            ].map((bundle, index) => {
              if (bundle) {
                return (
                  <>
                    {" "}
                    <div
                      key={index}
                      className="recommended-results-card-header"
                    >
                      <div key={bundle ? bundle[0]._id : ""}>
                        {bundle?.map((room) => {
                          return (
                            <>
                              <p style={{ fontWeight: "bold" }}>
                                {room.count} x {room.roomType} rooms
                              </p>
                              <p>
                                {` Each room has ${room.bedCount} beds: ${
                                  room.bedCount === 2
                                    ? "One twin bed or two single beds"
                                    : room.bedCount === 3
                                    ? "One twin bed and one single bed"
                                    : room.bedCount === 4
                                    ? "One twin bed and two single beds"
                                    : ""
                                }`}
                              </p>
                            </>
                          );
                        })}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        {
                          <>
                            <p>
                              {
                                totalPriceAndNightsCalculator(
                                  bundle.reduce(
                                    (acc, room) => acc + room.price,
                                    0
                                  ),
                                  checkIn,
                                  checkOut
                                )[1]
                              }{" "}
                              nights, {personCount} guests
                            </p>
                            <p style={{ fontWeight: "bold" }}>
                              Total price:{" "}
                              {
                                totalPriceAndNightsCalculator(
                                  bundle.reduce(
                                    (acc, room) => acc + room.price,
                                    0
                                  ),
                                  checkIn,
                                  checkOut
                                )[0]
                              }
                            </p>
                          </>
                        }
                      </div>
                      {bookingContext &&
                      bookingContext.bookingDetails &&
                      bookingContext.bookingDetails.length > 0 ? (
                        <Button as={Link} to={"/checkout"} variant="secondary">
                          Checkout
                        </Button>
                      ) : (
                        <AddRoomToBookingButton
                          textContent="Select"
                          className="outline-primary"
                          roomId={bundle.reduce((acc, room) => {
                            for (let i = 0; i < room.count; i++) {
                              acc += room._id + (i < room.count - 1 ? "," : "");
                            }

                            return (
                              acc +
                              (bundle.indexOf(room) !== bundle.length - 1
                                ? ","
                                : "")
                            );
                          }, "")}
                          checkIn={checkIn}
                          checkOut={checkOut}
                        />
                      )}
                    </div>
                  </>
                );
              }
            })}
            <CustomToggle eventKey="0">More results</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body
              style={{ maxHeight: "500px", overflowY: "auto" }}
              className="recommended-results-card-body"
            >
              {response?.map((bundle, index) => {
                if (bundle) {
                  return (
                    <>
                      {" "}
                      <div
                        key={index}
                        className="recommended-results-card-header"
                      >
                        <div key={bundle ? bundle[0]._id : ""}>
                          {bundle?.map((room) => {
                            return (
                              <>
                                <p style={{ fontWeight: "bold" }}>
                                  {room.count} x {room.roomType} rooms
                                </p>
                                <p>
                                  {` Each room has ${room.bedCount} beds: ${
                                    room.bedCount === 2
                                      ? "One twin bed or two single beds"
                                      : room.bedCount === 3
                                      ? "One twin bed and one single bed"
                                      : room.bedCount === 4
                                      ? "One twin bed and two single beds"
                                      : ""
                                  }`}
                                </p>
                              </>
                            );
                          })}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          {
                            <>
                              <p>
                                {
                                  totalPriceAndNightsCalculator(
                                    bundle.reduce(
                                      (acc, room) => acc + room.price,
                                      0
                                    ),
                                    checkIn,
                                    checkOut
                                  )[1]
                                }{" "}
                                nights, {personCount} guests
                              </p>
                              <p style={{ fontWeight: "bold" }}>
                                Total price:{" "}
                                {
                                  totalPriceAndNightsCalculator(
                                    bundle.reduce(
                                      (acc, room) => acc + room.price,
                                      0
                                    ),
                                    checkIn,
                                    checkOut
                                  )[0]
                                }
                              </p>
                            </>
                          }
                        </div>
                        {bookingContext &&
                        bookingContext.bookingDetails &&
                        bookingContext.bookingDetails.length > 0 ? (
                          <Button
                            as={Link}
                            to={"/checkout"}
                            variant="secondary"
                          >
                            Checkout
                          </Button>
                        ) : (
                          <AddRoomToBookingButton
                            textContent="Select"
                            className="asd"
                            roomId={bundle.reduce((acc, room) => {
                              for (let i = 0; i < room.count; i++) {
                                acc +=
                                  room._id + (i < room.count - 1 ? "," : "");
                              }

                              return (
                                acc +
                                (bundle.indexOf(room) !== bundle.length - 1
                                  ? ","
                                  : "")
                              );
                            }, "")}
                            checkIn={checkIn}
                            checkOut={checkOut}
                          />
                        )}
                      </div>
                    </>
                  );
                }
              })}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};

export default SearchRecommendation;

SearchRecommendation.propTypes = {
  children: PropTypes.element,
  eventKey: PropTypes.number,
  filters: PropTypes.object.isRequired,
};

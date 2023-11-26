import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Spinner,
  useAccordionButton,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";

import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { formatDateString } from "../util/formatDateString";
import { totalPriceAndNightsCalculator } from "../util/totalPriceAndNightsCalculator";
import AddRoomToBookingButton from "./AddRoomToBookingButton";
import FullScreenPopUp from "./FullScreenPopUp";

const SearchRecommendation = ({ filters }) => {
  const [response, setResponse] = useState(null);

  const queryParams = new URLSearchParams(useLocation().search);
  let checkIn = formatDateString(queryParams.get("checkIn"));
  let checkOut = formatDateString(queryParams.get("checkOut"));
  let personCount = queryParams.get("personCount");
  let roomCount = queryParams.get("roomCount");

  checkIn = new Date(checkIn).toString();
  checkOut = new Date(checkOut).toString();

  const { isLoading, error, performFetch } = useFetch(
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
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>{error.toString()}</p>
      ) : (
        <>
          {" "}
          <h4>Recommended for {`${personCount}`} guests</h4>
          <Accordion
            defaultActiveKey="1"
            className="recommended-results-accordion"
          >
            <Card>
              <Card.Header className="recommended-results-card">
                {[
                  response && response[0] ? response[0] : null,
                  response && response[0] ? response[1] : null,
                ].map((bundle, index) => {
                  if (bundle) {
                    return (
                      <>
                        <div
                          key={index}
                          className="recommended-results-card-header"
                        >
                          <div
                            key={bundle ? bundle[0]._id : ""}
                            className="recommended-results-card-header-rooms"
                          >
                            {bundle?.map((room) => {
                              return (
                                <>
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      margin: "0",
                                    }}
                                  >
                                    {room.count} x {room.roomType} rooms
                                    {
                                      <FullScreenPopUp
                                        className={"room-info-btn"}
                                        roomId={room._id}
                                        title={
                                          <p>{`Room type: ${room.roomType}`}</p>
                                        }
                                      />
                                    }
                                  </p>
                                  <p>
                                    {bundle.length === 1
                                      ? ` Each room has: ${
                                          room.bedCount === 1
                                            ? "One single bed"
                                            : room.bedCount === 2
                                            ? "Two single beds or one large double bed"
                                            : room.bedCount === 3
                                            ? "Three single beds or one large double bed and one single bed"
                                            : room.bedCount === 4
                                            ? "Four single beds or two large double beds"
                                            : ""
                                        }`
                                      : ` Room has: ${
                                          room.bedCount === 1
                                            ? "One single bed"
                                            : room.bedCount === 2
                                            ? "Two single beds or one large double bed"
                                            : room.bedCount === 3
                                            ? "Three single beds or one large double bed and one single bed"
                                            : room.bedCount === 4
                                            ? "Four single beds or two large double beds"
                                            : ""
                                        }`}
                                  </p>
                                </>
                              );
                            })}
                          </div>

                          <div className="recommended-results-card-header-total-price">
                            {
                              <>
                                <p>
                                  {`${
                                    totalPriceAndNightsCalculator(
                                      bundle.reduce(
                                        (acc, room) => acc + room.price,
                                        0
                                      ),
                                      checkIn,
                                      checkOut
                                    )[1]
                                  } nights, ${personCount} guests`}
                                </p>
                                <p style={{ fontWeight: "bold" }}>
                                  {` Total price: €${
                                    totalPriceAndNightsCalculator(
                                      bundle.reduce(
                                        (acc, room) => acc + room.price,
                                        0
                                      ),
                                      checkIn,
                                      checkOut
                                    )[0]
                                  }`}
                                </p>
                              </>
                            }
                          </div>
                          <AddRoomToBookingButton
                            textContent="Select"
                            className="recommended-results-btn btn btn-outline-primary"
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
                          <div
                            key={index}
                            className="recommended-results-card-header"
                          >
                            <div
                              key={bundle ? bundle[0]._id : ""}
                              className="recommended-results-card-header-rooms"
                            >
                              {bundle?.map((room) => {
                                return (
                                  <>
                                    <p style={{ fontWeight: "bold" }}>
                                      {room.count} x {room.roomType} rooms
                                      {
                                        <FullScreenPopUp
                                          className={"room-info-btn"}
                                          roomId={room._id}
                                          title={
                                            <p>{`Room type: ${room.roomType}`}</p>
                                          }
                                        />
                                      }
                                    </p>
                                    <p>
                                      {bundle.length === 1
                                        ? ` Each room has: ${
                                            room.bedCount === 1
                                              ? "One single bed"
                                              : room.bedCount === 2
                                              ? "Two single beds or one large double bed"
                                              : room.bedCount === 3
                                              ? "Three single beds or one large double bed and one single bed"
                                              : room.bedCount === 4
                                              ? "Four single beds or two large double beds"
                                              : ""
                                          }`
                                        : ` Room has: ${
                                            room.bedCount === 1
                                              ? "One single bed"
                                              : room.bedCount === 2
                                              ? "Two single beds or one large double bed"
                                              : room.bedCount === 3
                                              ? "Three single beds or one large double bed and one single bed"
                                              : room.bedCount === 4
                                              ? "Four single beds or two large double beds"
                                              : ""
                                          }`}
                                    </p>
                                  </>
                                );
                              })}
                            </div>

                            <div className="recommended-results-card-header-total-price">
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
                                    {`Total price: €${
                                      totalPriceAndNightsCalculator(
                                        bundle.reduce(
                                          (acc, room) => acc + room.price,
                                          0
                                        ),
                                        checkIn,
                                        checkOut
                                      )[0]
                                    }`}
                                  </p>
                                </>
                              }
                            </div>
                            <AddRoomToBookingButton
                              textContent="Select"
                              className="recommended-results-btn btn btn-outline-primary"
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
      )}
    </>
  );
};

export default SearchRecommendation;

SearchRecommendation.propTypes = {
  children: PropTypes.element,
  eventKey: PropTypes.number,
  filters: PropTypes.object.isRequired,
};

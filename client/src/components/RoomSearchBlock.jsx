import { Button, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import Accordion from "react-bootstrap/Accordion";
import "react-calendar/dist/Calendar.css";
import "./CSS/RoomSearchBlock.css";

const RoomSearchBlock = () => {
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState(["yyyy-mm-dd", "yyyy-mm-dd"]);
  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(0);
  const [room, setRoom] = useState(1);
  const [dateError, setDateError] = useState("none");

  const onChange = (nextValue) => {
    setValue(nextValue);
  };

  const increment = (set, count) => {
    if (count >= 0) set(count + 1);
  };

  const decrement = (set, count) => {
    if (count > 0) set(count - 1);
  };

  const checkInDate = new Date(value[0]);
  const checkOutDate = new Date(value[1]);

  const formattedCheckInDate = `${checkInDate.getFullYear()}-${
    checkInDate.getMonth() + 1
  }-${checkInDate.getDate()}`;

  const formattedCheckOutDate = `${checkOutDate.getFullYear()}-${
    checkOutDate.getMonth() + 1
  }-${checkOutDate.getDate()}`;

  useEffect(() => {
    setDate([formattedCheckInDate, formattedCheckOutDate]);
  }, [value]);

  return (
    <Container className="search-accordion-container">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="header">
            <div className="search-dates">
              <p>{value.length === 2 ? date[0] : "Check-in date"} </p>
              <p>{value.length === 2 ? date[1] : "Check-out date"} </p>
            </div>
            <div className="search-dates">
              <p>
                <span>{adult}</span> adults
              </p>

              <p>
                <span>{child}</span> children
              </p>

              <p>
                <span>{room}</span> rooms
              </p>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <Container className="search-block-container">
              <div className="search-options">
                <div className="search-options-counter">
                  <p className="search-options-title h4">Adults</p>

                  <Button
                    className="counter-btn"
                    variant="outline-secondary"
                    onClick={() => {
                      increment(setAdult, adult);
                    }}
                  >
                    +
                  </Button>
                  <span className="counter">{adult}</span>
                  <Button
                    className="counter-btn"
                    variant="outline-secondary"
                    onClick={() => {
                      decrement(setAdult, adult);
                    }}
                  >
                    -
                  </Button>
                </div>
                <div className="search-options-counter">
                  <p className="search-options-title h4">Children</p>

                  <Button
                    className="counter-btn"
                    variant="outline-secondary"
                    onClick={() => {
                      increment(setChild, child);
                    }}
                  >
                    +
                  </Button>
                  <span className="counter">{child}</span>
                  <Button
                    className="counter-btn"
                    variant="outline-secondary"
                    onClick={() => {
                      decrement(setChild, child);
                    }}
                  >
                    -
                  </Button>
                </div>
                <div className="search-options-counter">
                  <p className="search-options-title h4">Rooms</p>

                  <Button
                    className="counter-btn"
                    variant="outline-secondary"
                    onClick={() => {
                      increment(setRoom, room);
                    }}
                  >
                    +
                  </Button>
                  <span className="counter">{room}</span>
                  <Button
                    className="counter-btn"
                    variant="outline-secondary"
                    onClick={() => {
                      decrement(setRoom, room);
                    }}
                  >
                    -
                  </Button>
                </div>
              </div>

              <Calendar
                selectRange={true}
                goToRangeStartOnSelect={false}
                onChange={onChange}
                value={value}
                minDate={new Date()}
                minDetail={"year"}
                locale={"en-EN"}
              />
            </Container>
            <div className="search-btn-block">
              <Button
                as={value[0] ? Link : undefined}
                to={
                  value[0]
                    ? `/RoomInfoCard?checkIn=${formattedCheckInDate}&checkOut=${formattedCheckOutDate}&personCount=${
                        room === 1 ? "" : adult + child
                      }&roomCount=${room === 1 ? "" : room}`
                    : undefined
                }
                className="search-btn"
                variant="outline-success"
                size="lg"
                onClick={() => {
                  if (!value[0]) {
                    setDateError("block");
                  } else {
                    setDateError("none");
                  }
                }}
              >
                Search
              </Button>
              <p style={{ color: "red", display: dateError }}>
                Please select dates
              </p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default RoomSearchBlock;

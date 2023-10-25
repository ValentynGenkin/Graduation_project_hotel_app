import { Button, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Accordion from "react-bootstrap/Accordion";
import "react-calendar/dist/Calendar.css";
import "./CSS/RoomSearchBlock.css";

const RoomSearchBlock = () => {
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState(["yyyy-mm-dd", "yyyy-mm-dd"]);
  const [adult, setAdult] = useState(2);
  const [childe, setChilde] = useState(0);
  const [room, setRoom] = useState(1);

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
    <Container>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="search-dates">
              <p className="h5">
                {" "}
                {value.length === 2 ? date[0] : "Check-in date"}{" "}
              </p>
              <p className="h5">
                {" "}
                {value.length === 2 ? date[1] : "Check-out date"}{" "}
              </p>
            </div>
            <div className="search-dates">
              <p className="h5">
                <span>{adult}</span> adults
              </p>

              <p className="h5">
                <span>{childe}</span> children
              </p>

              <p className="h5">
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
                    variant="outline-light"
                    onClick={() => {
                      increment(setAdult, adult);
                    }}
                  >
                    +
                  </Button>
                  <span className="counter">{adult}</span>
                  <Button
                    className="counter-btn"
                    variant="outline-light"
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
                    variant="outline-light"
                    onClick={() => {
                      increment(setChilde, childe);
                    }}
                  >
                    +
                  </Button>
                  <span className="counter">{childe}</span>
                  <Button
                    className="counter-btn"
                    variant="outline-light"
                    onClick={() => {
                      decrement(setChilde, childe);
                    }}
                  >
                    -
                  </Button>
                </div>
                <div className="search-options-counter">
                  <p className="search-options-title h4">Rooms</p>

                  <Button
                    className="counter-btn"
                    variant="outline-light"
                    onClick={() => {
                      increment(setRoom, room);
                    }}
                  >
                    +
                  </Button>
                  <span className="counter">{room}</span>
                  <Button
                    className="counter-btn"
                    variant="outline-light"
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
              <Button variant="light">Search</Button>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default RoomSearchBlock;

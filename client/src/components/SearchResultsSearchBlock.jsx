import { Button, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CSS/SearchResultsSearchBLock.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { formatDateString } from "../util/formatDateString";

const SearchResultsSearchBLock = () => {
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState(["yyyy-mm-dd", "yyyy-mm-dd"]);
  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(0);
  const [room, setRoom] = useState(1);

  const queryParams = new URLSearchParams(useLocation().search);

  let checkIn = formatDateString(queryParams.get("checkIn"));
  let checkOut = formatDateString(queryParams.get("checkOut"));

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

  const handleLinkClick = () => {
    const newUrl = `/RoomInfoCard?checkIn=${formattedCheckInDate}&checkOut=${formattedCheckOutDate}`;

    window.location.href = newUrl;
  };

  return (
    <Container className="search-page-accordion-container">
      <div className="search-page-inputs-block">
        <div className="search-page-dates">
          <div className="aaa">
            <DropdownButton
              id="dropdown-calendar"
              title={
                <div className="checkin-checkout">
                  <div>{value.length === 2 ? date[0] : checkIn} </div>
                  <div>{value.length === 2 ? date[1] : checkOut} </div>
                </div>
              }
            >
              <Dropdown.Item className="calendar-close-btn">
                Close
              </Dropdown.Item>
              <div>
                <Calendar
                  selectRange={true}
                  goToRangeStartOnSelect={false}
                  onChange={onChange}
                  value={value}
                  minDate={new Date()}
                  minDetail={"year"}
                  locale={"en-EN"}
                />
              </div>
            </DropdownButton>
          </div>

          <div className="search-counter">
            <span>{`${adult} adult${adult > 1 ? "s" : ""}`}</span>
            <div>
              <Button
                className="search-page-counter-btn"
                variant="outline-light"
                onClick={() => {
                  increment(setAdult, adult);
                }}
              >
                +
              </Button>
              <Button
                className="search-page-counter-btn"
                variant="outline-light"
                onClick={() => {
                  decrement(setAdult, adult);
                }}
              >
                -
              </Button>
            </div>
          </div>

          <div className="search-counter">
            <span>{`${child} children`}</span>
            <div>
              <Button
                className="search-page-counter-btn"
                variant="outline-light"
                onClick={() => {
                  increment(setChild, child);
                }}
              >
                +
              </Button>
              <Button
                className="search-page-counter-btn"
                variant="outline-light"
                onClick={() => {
                  decrement(setChild, child);
                }}
              >
                -
              </Button>
            </div>
          </div>

          <div className="search-counter">
            <span>{`${room} room${room > 1 ? "s" : ""}`}</span>
            <div>
              <Button
                className="search-page-counter-btn"
                variant="outline-light"
                onClick={() => {
                  increment(setRoom, room);
                }}
              >
                +
              </Button>
              <Button
                className="search-page-counter-btn"
                variant="outline-light"
                onClick={() => {
                  decrement(setRoom, room);
                }}
              >
                -
              </Button>
            </div>
          </div>
          <Link
            to={`/RoomInfoCard?checkIn=${formattedCheckInDate}&checkOut=${formattedCheckOutDate}`}
          >
            <Button
              variant="success"
              size="lg"
              className="search-page-search-btn"
              onClick={() => {
                handleLinkClick();
              }}
            >
              Search
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default SearchResultsSearchBLock;
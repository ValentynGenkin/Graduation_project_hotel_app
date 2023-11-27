import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Accordion from "react-bootstrap/Accordion";
import { Button, Container } from "react-bootstrap";
import "../CSS/Booking.css";
import SearchBlockAdmin from "./SearchBlockAdmin";
import Navbar from "./Navbar";
import Footer from "./Footer";

function CustomerBooking() {
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState(["yyyy-mm-dd", "yyyy-mm-dd"]);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const onChange = (nextValue) => {
    setValue(nextValue);
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
    <>
      <Navbar />
      <Container style={{ minHeight: "calc(100vh - 204px)" }}>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header className="header">
              <div className="search-dates">
                <p>{value.length === 2 ? date[0] : "Check-in date"} </p>
                <p>{value.length === 2 ? date[1] : "Check-out date"} </p>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Container className="search-block-container">
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
                  className="search-btn"
                  variant="outline-success"
                  size="lg"
                  onClick={() => setPopupVisible(true)}
                >
                  Search
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {isPopupVisible && (
          <SearchBlockAdmin checkIn={value[0]} checkOut={value[1]} />
        )}
      </Container>
      <Footer />
    </>
  );
}

export default CustomerBooking;

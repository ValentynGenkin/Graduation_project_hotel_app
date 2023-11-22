import React, { useContext } from "react";
import { Accordion, Button, Card, useAccordionButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookingContext } from "../contexts/BookingContext";
import PropTypes from "prop-types";

const SearchRecommendation = () => {
  const { bookingContext } = useContext(BookingContext);

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
      <h4>Recommended for 4 guests</h4>
      <Accordion defaultActiveKey="1" className="recommended-results-accordion">
        <Card>
          <Card.Header className="recommended-results-card">
            <div className="recommended-results-card-header">
              <div>
                <p style={{ fontWeight: "bold" }}>2 x Deluxe rooms</p>
                <p>Each room has: Two single beds or one large double bed</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p>2 nights, 4 guests</p>
                <p style={{ fontWeight: "bold" }}>Total price: 1000</p>
              </div>
              {bookingContext &&
              bookingContext.bookingDetails &&
              bookingContext.bookingDetails.length > 0 ? (
                <Button as={Link} to={"/checkout"} variant="secondary">
                  Checkout
                </Button>
              ) : (
                <Button variant="outline-primary">Select</Button>
              )}
            </div>{" "}
            <div className="recommended-results-card-header">
              <div>
                <p style={{ fontWeight: "bold" }}>1 x Deluxe room</p>
                <p style={{ fontWeight: "bold" }}>1 x Twin room</p>
                <p>Each room has: Two single beds or one large double bed</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p>2 nights, 4 guests</p>
                <p style={{ fontWeight: "bold" }}>Total price: 800</p>
              </div>

              {bookingContext &&
              bookingContext.bookingDetails &&
              bookingContext.bookingDetails.length > 0 ? (
                <Button as={Link} to={"/checkout"} variant="outline-primary">
                  Checkout
                </Button>
              ) : (
                <Button variant="outline-primary">Select</Button>
              )}
            </div>
            <CustomToggle eventKey="0">More results</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="recommended-results-card-body"></Card.Body>
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
};

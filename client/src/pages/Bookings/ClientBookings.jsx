import React from "react";
import { Button, Container } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

import AliceCarousel from "react-alice-carousel";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Room1Image from "../../assets/room1.jpg";
import Room2Image from "../../assets/room2.jpg";
import Room3Image from "../../assets/room3.jpg";
import Room4Image from "../../assets/room4.jpg";

import "../../Components/CSS/ClientBookings.css";

const responsive = {
  1060: { items: 1 },
};

const ClientBookings = () => {
  const items = [
    <div className="main-screen-card-item" data-value="1" key={"1"}>
      <img src={Room1Image} alt="" className="main-screen-card-img" />
    </div>,
    <div className="main-screen-card-item" data-value="2" key={"2"}>
      <img src={Room2Image} alt="" className="main-screen-card-img" />
    </div>,
    <div className="main-screen-card-item" data-value="3" key={"3"}>
      <img src={Room3Image} alt="" className="main-screen-card-img" />
    </div>,
    <div className="main-screen-card-item" data-value="4" key={"4"}>
      <img src={Room4Image} alt="" className="main-screen-card-img" />
    </div>,
    <div className="main-screen-card-item" data-value="4" key={"5"}>
      <img src={Room2Image} alt="" className="main-screen-card-img" />
    </div>,
  ];
  return (
    <Container className="client-booking-container">
      <Container className="client-booking-item">
        <div className="booking-date-information">
          <div>
            <span>Check-in: </span>

            <span>12.11.2023 14:00</span>
          </div>
          <div>
            <span>Check-out: </span>

            <span>15.11.2023 12:00</span>
          </div>
        </div>
        <div className="bookings-description-block">
          <div className="bookings-img-carousel">
            <AliceCarousel
              items={items}
              responsive={responsive}
              controlsStrategy="alternate"
              disableDotsControls
            />
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
        <Accordion>
          <Accordion.Item eventKey="0" className="bookings-accordion">
            <Accordion.Header className="bookings-accordion-header">
              Send a request
            </Accordion.Header>
            <Accordion.Body>
              <h6>Send a request</h6>
              <FloatingLabel controlId="floatingTextarea2" label="Comments">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
              <Button variant="outline-secondary" className="request-send-btn">
                Send
              </Button>
              <Table className="client-request-table">
                <thead>
                  <tr>
                    <th className="booking-table-number">#</th>
                    <th className="booking-table-request">Request</th>
                    <th className="booking-table-status">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Hello I would like ...</td>
                    <td>Done</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Hello I would like ...</td>
                    <td>Canceled</td>
                  </tr>
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>

      <h4>Booking history:</h4>
      <Container className="client-booking-item">
        <div className="booking-date-information">
          <div>
            <span>Check-in: </span>

            <span>12.11.2023 14:00</span>
          </div>
          <div>
            <span>Check-out: </span>

            <span>15.11.2023 12:00</span>
          </div>
        </div>
        <div className="bookings-description-block">
          <div className="bookings-img-carousel">
            <AliceCarousel
              items={items}
              responsive={responsive}
              controlsStrategy="alternate"
              disableDotsControls
            />
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
      </Container>
    </Container>
  );
};

export default ClientBookings;

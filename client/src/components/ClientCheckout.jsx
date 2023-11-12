import React, { useEffect, useState } from "react";
import { Accordion, Container, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Button } from "react-bootstrap";
import { default as useFetchAuth } from "../hooks/useFetch";
import { default as useFetchBooking } from "../hooks/useFetch";
import "./CSS/ClientCheckout.css";
import Input from "./InputComponent";
import { useBookingContext } from "../contexts/BookingContext";
import { dateFormatter } from "../util/dateFormatter";
import Carousel from "react-bootstrap/Carousel";

const ClientCheckout = () => {
  const { bookingContext, handleBookingContext } = useBookingContext();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [inputChange, setInputChange] = useState(true);
  const [authResponse, setAuthResponse] = useState(null);
  const {
    isLoading: isLoadingAuth,
    error: errorAuth,
    performFetch: performFetchAuth,
  } = useFetchAuth("/customer/auth", (response) => {
    setAuthResponse(response);
  });

  useEffect(() => {
    performFetchAuth({
      method: "GET",
      credentials: "include",
      headers: { "content-type": "application/json" },
    });
  }, []);

  const {
    isLoading: isLoadingBooking,
    // error: errorBooking,
    // performFetch: performFetchBooking,
  } = useFetchBooking("/customer/auth", (response) => {
    setAuthResponse(response);
  });

  useEffect(() => {
    if (authResponse && authResponse.success === true) {
      setInputChange(true);
      setUserData({
        firstName: authResponse.customer.firstname,
        lastName: authResponse.customer.lastname,
        email: authResponse.customer.email,
        phoneNumber: authResponse.customer.phone,
      });
    } else {
      setInputChange(false);
    }
  }, [authResponse, errorAuth]);

  let totalCost = 0;

  bookingContext &&
    bookingContext.bookingDetails.forEach((bookingDetail) => {
      const roomPrice = parseFloat(
        bookingDetail.roomId.roomPrice.$numberDecimal
      );
      const checkInDate = new Date(bookingDetail.checkIn);
      const checkOutDate = new Date(bookingDetail.checkOut);

      checkInDate.setHours(14, 0, 0, 0);
      checkOutDate.setHours(12, 0, 0, 0);

      const timeCorrection = 2 * 60 * 60 * 1000;
      const numberOfNights = Math.ceil(
        (checkOutDate - checkInDate - timeCorrection) / (1000 * 60 * 60 * 24)
      );

      const roomCost = numberOfNights * roomPrice;
      totalCost += roomCost;
    });

  function removeBookingById(idToRemove) {
    const storedDataString = localStorage.getItem("booking");
    const storedData = JSON.parse(storedDataString);

    function removeBookingById(data, bookingId) {
      const updatedBookingDetails = data.bookingDetails.filter(
        (bookingDetail) => bookingDetail._id !== bookingId
      );
      return {
        ...data,
        bookingDetails: updatedBookingDetails,
      };
    }
    const newData = removeBookingById(storedData, idToRemove);

    localStorage.setItem("booking", JSON.stringify(newData));
    handleBookingContext();
  }

  return (
    <Container className="client-checkout-container">
      <h5 className="checkout-title">Booking confirmation</h5>
      {isLoadingAuth || isLoadingBooking ? (
        <Spinner />
      ) : (
        <>
          <div className="checkout-tourist-info">
            <h6 className="checkout-booking-title">Tourist information</h6>

            <Input
              id={"checkout-first-name"}
              type={"text"}
              label={"first name"}
              text={"First name"}
              changeability={inputChange}
              value={userData.firstName}
              cb={(e) => {
                setUserData({ ...userData, firstName: e.target.value });
              }}
            />
            <Input
              id={"checkout-last-name"}
              type={"text"}
              label={"Last name"}
              text={"Last name"}
              changeability={inputChange}
              value={userData.lastName}
              cb={(e) => {
                setUserData({ ...userData, lastName: e.target.value });
              }}
            />
            <Input
              id={"checkout-email"}
              type={"email"}
              label={"e-mail"}
              text={"E-mail"}
              changeability={inputChange}
              value={userData.email}
              cb={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
            />
            <Input
              id={"checkout-phone-num"}
              type={"tel"}
              label={"Phone number"}
              text={"Phone number"}
              changeability={inputChange}
              value={userData.phoneNumber}
              cb={(e) => {
                setUserData({ ...userData, phoneNumber: e.target.value });
              }}
            />
          </div>
          <h6 className="checkout-booking-title">Booking information</h6>
          {bookingContext.bookingDetails.map((item) => (
            <Accordion key={item._id} className="checkout-accordion">
              <Accordion.Item
                eventKey="0"
                style={{ border: "1px solid lightgrey" }}
              >
                <Accordion.Header className="checkout-accordion-header">
                  <div className="checkout-booking-info">
                    <div>
                      <p className="checkout-booking-info-title">Check-in:</p>
                      <p className="checkout-booking-info-value">
                        {dateFormatter(new Date(item.checkIn))}
                      </p>
                    </div>
                    <div>
                      <p className="checkout-booking-info-title">Check-out:</p>
                      <p className="checkout-booking-info-value">
                        {dateFormatter(new Date(item.checkOut))}
                      </p>
                    </div>
                    <div>
                      <p className="checkout-booking-info-title">Room type:</p>
                      <p className="checkout-booking-info-value room-type-value">
                        {item.roomId.roomType}
                      </p>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="accordion-body-block">
                  <div className="checkout-accordion-body">
                    <Carousel indicators={false} className="checkout-carousel">
                      {item.roomId.images.map((img) => (
                        <Carousel.Item key={img}>
                          <img
                            src={img}
                            alt="Room photo"
                            className="checkout-carousel-img"
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                    <div className="checkout-room-info">
                      <h6>{item.roomId.roomDescription}</h6>
                      <ul>
                        {item.roomId.facilities.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                      <h6>
                        Price per night: €{item.roomId.roomPrice.$numberDecimal}
                      </h6>
                    </div>
                  </div>
                  <div className="checkout-delete-room-btn">
                    <Button
                      variant="danger"
                      onClick={() => {
                        removeBookingById(item._id);
                      }}
                    >
                      Delete room
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}

          <br />
          <div className="checkout-comments">
            <h6>Add comment</h6>
            <FloatingLabel controlId="floatingTextarea2" label="Comments">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
              />
            </FloatingLabel>

            <br />
            <div className="checkout-amount">
              <p className="checkout-booking-info-title"> Total amount: </p>
              <p className="checkout-booking-info-value">€{totalCost}</p>
            </div>
            <div className="checkout-confirmation-btn">
              <Button variant="outline-secondary" className="">
                Back
              </Button>

              <Button variant="outline-secondary" className="">
                Confirm
              </Button>
            </div>
          </div>
          <br />
        </>
      )}
    </Container>
  );
};

export default ClientCheckout;

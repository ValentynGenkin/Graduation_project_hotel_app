import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Button } from "react-bootstrap";

import { default as useFetchAuth } from "../hooks/useFetch";
import { default as useFetchBooking } from "../hooks/useFetch";
import "./CSS/ClientCheckout.css";
import Input from "./InputComponent";
// import { useBookingContext } from "../contexts/BookingContext";

const ClientCheckout = () => {
  // const { bookingContext, handleBookingContext } = useBookingContext();
  // console.log(bookingContext);
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

  return (
    <Container className="client-checkout-container">
      <h5 className="checkout-title">Booking confirmation</h5>
      {isLoadingAuth || isLoadingBooking ? (
        <Spinner />
      ) : (
        <>
          <div className="checkout-tourist-info">
            <h6>Tourist information</h6>

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
          <div className="checkout-booking-info">
            <h6>Booking information</h6>
            <div>
              <p className="checkout-booking-info-title">Check-in date:</p>
              <p className="checkout-booking-info-value">test</p>
            </div>
            <div>
              <p className="checkout-booking-info-title"> Check-out date: </p>
              <p className="checkout-booking-info-value">test</p>
            </div>
            <div>
              <p className="checkout-booking-info-title"> Guests: </p>
              <p className="checkout-booking-info-value">test</p>
            </div>
            <div>
              <p className="checkout-booking-info-title"> Bad type: </p>
              <p className="checkout-booking-info-value">test</p>
            </div>
            <div>
              <p className="checkout-booking-info-title"> Extra: </p>
              <p className="checkout-booking-info-value">test</p>
            </div>
          </div>
          <div className="checkout-room-info">
            <h6>Room information</h6>
          </div>
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
              <p className="checkout-booking-info-value">250.00 euro</p>
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

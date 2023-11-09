import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Button } from "react-bootstrap";

import { default as useFetchAuth } from "../hooks/useFetch";
import "./CSS/ClientCheckout.css";
import Input from "./InputComponent";

const ClientCheckout = () => {
  const [authResponse, setAuthResponse] = useState(null);
  const {
    // isLoading: isLoadingAuth,
    // error: errorAuth,
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
  }, [authResponse]);

  return (
    <Container className="client-checkout-container">
      <h5 className="checkout-title">Booking confirmation</h5>
      <div className="checkout-tourist-info">
        <h6>Tourist information</h6>

        <Input
          id={"checkout-first-name"}
          type={"text"}
          label={"first name"}
          text={"First name"}
          changeability={true}
          // defaultValue={authResponse.customer.firstname}
        />
        <Input
          id={"checkout-last-name"}
          type={"text"}
          label={"Last name"}
          text={"Last name"}
          changeability={true}
          defaultValue={"Name"}
        />
        <Input
          id={"checkout-email"}
          type={"email"}
          label={"e-mail"}
          text={"E-mail"}
          changeability={true}
          defaultValue={"aaa@aaa.com"}
        />
        <Input
          id={"checkout-phone-num"}
          type={"tel"}
          label={"Phone number"}
          text={"Phone number"}
          changeability={true}
          defaultValue={"0681234567"}
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
    </Container>
  );
};

export default ClientCheckout;

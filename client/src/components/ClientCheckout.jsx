import React from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Button } from "react-bootstrap";

import "./CSS/ClientCheckout.css";
import Input from "./InputComponent";

const ClientCheckout = () => {
  return (
    <Container className="client-checkout-container">
      <div className="checkout-tourist-info">
        <h5>Tourist information</h5>
        <Input
          id={"checkout-first-name"}
          type={"text"}
          label={"first name"}
          text={"First name"}
          changeability={true}
          placeholder={"Name"}
        />
        <Input
          id={"checkout-last-name"}
          type={"text"}
          label={"Last name"}
          text={"Last name"}
          changeability={true}
          placeholder={"Name"}
        />
        <Input
          id={"checkout-email"}
          type={"email"}
          label={"e-mail"}
          text={"E-mail"}
          changeability={true}
          placeholder={"aaa@aaa.com"}
        />
        <Input
          id={"checkout-phone-num"}
          type={"tel"}
          label={"Phone number"}
          text={"Phone number"}
          changeability={true}
          placeholder={"0681234567"}
        />
      </div>
      <div className="checkout-booking-info">
        <h5>Booking information</h5>
        <p className="input-group-text"> Check-in date: </p>
        <p className="input-group-text"> Check-out date: </p>
        <p className="input-group-text"> Guests: </p>
        <p className="input-group-text"> Bad type: </p>
        <p className="input-group-text"> Extra: </p>
      </div>
      <div>
        <h5>Room information</h5>
      </div>

      <div>
        <h5>Add extra options</h5>
        <Button variant="outline-secondary" className="">
          Transfer from airport
        </Button>
        <Button variant="outline-secondary" className="">
          Birthday greeting
        </Button>
        <Button variant="outline-secondary" className="">
          Honeymoon greeting
        </Button>
      </div>

      <h6>Add comment</h6>
      <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
        />
      </FloatingLabel>
      <Button variant="outline-secondary" className="">
        Confirm
      </Button>
      <Button variant="outline-secondary" className="">
        Cancel
      </Button>
    </Container>
  );
};

export default ClientCheckout;

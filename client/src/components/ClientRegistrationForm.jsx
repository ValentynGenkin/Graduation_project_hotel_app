import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import "./CSS/ClientRegistrationForm.css";

const ClientRegistrationForm = () => {
  const [showPassword, setShowPassword] = useState("password");

  const showPasswordSwitch = () => {
    setShowPassword("text");
    if (showPassword === "text") setShowPassword("password");
  };

  return (
    <Container className="payment-method-container">
      <h5 className="registration-form-title">Registration form</h5>
      <div className="registration-form-inputs">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">First name</InputGroup.Text>
          <Form.Control
            type="text"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Last name</InputGroup.Text>
          <Form.Control
            type="text"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">E-mail</InputGroup.Text>
          <Form.Control
            aria-label="Username"
            aria-describedby="basic-addon1"
            type="email"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Phone number</InputGroup.Text>
          <Form.Control
            aria-label="Username"
            aria-describedby="basic-addon1"
            type="tel"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Date of Birth</InputGroup.Text>
          <Form.Control
            aria-label="Username"
            aria-describedby="basic-addon1"
            type="date"
          />
        </InputGroup>

        <InputGroup className="mb-3 payment-method-title">
          <InputGroup.Text id="basic-addon1">Payment method</InputGroup.Text>
        </InputGroup>
      </div>
      <Form>
        <div key="inline-radio" className="mb-3 payment-method-select">
          <div className="payment-method-select-component">
            <img src="./assets/ideal.png" alt="ideal" />
            <Form.Check inline name="group1" type="radio" id="inline-radio-1" />
          </div>
          <div className="payment-method-select-component">
            <img src="./assets/paypal.png" alt="paypal" />
            <Form.Check inline name="group1" type="radio" id="inline-radio-2" />
          </div>
          <div className="payment-method-select-component">
            <img src="./assets/credit-card.png" alt="credit card" />
            <Form.Check inline name="group1" type="radio" id="inline-radio-3" />
          </div>
        </div>
      </Form>
      <div className="registration-form-inputs">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
          <Form.Control
            type={showPassword}
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Repeat password</InputGroup.Text>
          <Form.Control
            type={showPassword}
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <img
            src="./assets/show-password.png"
            alt="show password"
            className="show-password-btn"
            onClick={() => {
              showPasswordSwitch();
            }}
          />
        </InputGroup>

        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="I agree ........"
          />
        </Form>
        <div className="sign-in-cancel-btn-block">
          <Button variant="outline-secondary">Sign-up</Button>
          <Button variant="outline-secondary">Cancel</Button>
        </div>
      </div>
    </Container>
  );
};

export default ClientRegistrationForm;

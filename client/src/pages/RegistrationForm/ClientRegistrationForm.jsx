import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import iDealImg from "../../assets/ideal.png";
import PayPalImg from "../../assets/paypal.png";
import CreditCardImg from "../../assets/credit-card.png";
import Input from "../../components/InputComponent";

import "../../components/CSS/ClientRegistrationForm.css";
import ShowPasswordBtn from "../../components/ShowPasswordBtn";

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
        <Input
          id={"registration-form-first-name"}
          type={"text"}
          label={"Username"}
          text={"First name"}
        />
        <Input
          id={"registration-form-last-name"}
          type={"text"}
          label={"Username"}
          text={"Last name"}
        />
        <Input
          id={"registration-form-email"}
          type={"email"}
          label={"E-mail"}
          text={"E-mail"}
        />
        <Input
          id={"registration-form-phone-num"}
          type={"tel"}
          label={"Phone number"}
          text={"Phone number"}
        />
        <Input
          id={"registration-form-bday"}
          type={"date"}
          label={"Date of Birth"}
          text={"Date of Birth"}
        />

        <InputGroup className="mb-3 payment-method-title">
          <InputGroup.Text id="basic-addon1">Payment method</InputGroup.Text>
        </InputGroup>
      </div>
      <Form>
        <div key="inline-radio" className="mb-3 payment-method-select">
          <div className="payment-method-select-component">
            <img src={iDealImg} alt="ideal" />
            <Form.Check inline name="group1" type="radio" id="inline-radio-1" />
          </div>
          <div className="payment-method-select-component">
            <img src={PayPalImg} alt="paypal" />
            <Form.Check inline name="group1" type="radio" id="inline-radio-2" />
          </div>
          <div className="payment-method-select-component">
            <img src={CreditCardImg} alt="credit card" />
            <Form.Check inline name="group1" type="radio" id="inline-radio-3" />
          </div>
        </div>
      </Form>
      <div className="registration-form-inputs">
        <Input
          id={"registration-form-password"}
          type={showPassword}
          label={"Password"}
          text={"Password"}
        />
        <Input
          id={"registration-form-repeat-password"}
          type={showPassword}
          label={"Password"}
          text={"Repeat password"}
          btn={<ShowPasswordBtn cb={showPasswordSwitch} />}
        />

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

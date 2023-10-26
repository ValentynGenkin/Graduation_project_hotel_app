import { Container } from "react-bootstrap";
import React from "react";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const ExistAccountInfo = () => {
  return (
    <Container className="payment-method-container">
      <h5 className="registration-form-title">Account info</h5>
      <div className="registration-form-inputs">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">First name</InputGroup.Text>
          <Form.Control
            type="text"
            aria-label="Username"
            aria-describedby="basic-addon1"
            disabled
            readOnly
            placeholder="First name"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Last name</InputGroup.Text>
          <Form.Control
            type="text"
            aria-label="Username"
            aria-describedby="basic-addon1"
            disabled
            readOnly
            placeholder="Last name"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">E-mail</InputGroup.Text>
          <Form.Control
            aria-label="Username"
            aria-describedby="basic-addon1"
            type="email"
            disabled
            readOnly
            placeholder="qwerty@qwerty.com"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Phone number</InputGroup.Text>
          <Form.Control
            aria-label="Username"
            aria-describedby="basic-addon1"
            type="tel"
            disabled
            readOnly
            placeholder="0681234567"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Date of Birth</InputGroup.Text>
          <Form.Control
            aria-label="Username"
            aria-describedby="basic-addon1"
            type="text"
            disabled
            readOnly
            placeholder="12.07.1987"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Payment method</InputGroup.Text>
          <Form.Control
            aria-label="Username"
            aria-describedby="basic-addon1"
            type="text"
            disabled
            readOnly
            placeholder="iDeal"
          />
        </InputGroup>
      </div>

      <div className="registration-form-inputs">
        <div className="sign-in-cancel-btn-block">
          <Button variant="outline-secondary">Update</Button>
          <Button variant="outline-secondary">Change password</Button>
          <Button variant="outline-danger">Delete account</Button>
        </div>
      </div>
    </Container>
  );
};

export default ExistAccountInfo;

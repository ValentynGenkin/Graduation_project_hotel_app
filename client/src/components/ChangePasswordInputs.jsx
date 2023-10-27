import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "./CSS/ChangePasswordPopUp.css";

const ChangePasswordInputs = () => {
  const [showPassword, setShowPassword] = useState("password");

  const showPasswordSwitch = () => {
    setShowPassword("text");
    if (showPassword === "text") setShowPassword("password");
  };

  return (
    <div className="change-password-inputs">
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Current password</InputGroup.Text>
        <Form.Control
          type={showPassword}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <br />
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">New password</InputGroup.Text>
        <Form.Control
          type={showPassword}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Repeat new password</InputGroup.Text>
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
    </div>
  );
};

export default ChangePasswordInputs;

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "./CSS/DeleteAccountPopUp.css";

const DeleteAccountConfirmation = () => {
  const [showPassword, setShowPassword] = useState("password");

  const showPasswordSwitch = () => {
    setShowPassword("text");
    if (showPassword === "text") setShowPassword("password");
  };
  return (
    <div className="delete-account">
      <h5>
        Enter your password to delete your account.
        <br />
        All data and past bookings will be deleted.
      </h5>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
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

export default DeleteAccountConfirmation;

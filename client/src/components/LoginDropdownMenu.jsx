import NavDropdown from "react-bootstrap/NavDropdown";
import { Form, InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/LoginDropdownMenu.css";
import PopUp from "./PopUp";
import ForgotPasswordPopUp from "./ForgotPasswordPopUp";

const LoginDropdownMenu = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <NavDropdown
      className="login-dropdown-menu"
      title="Login"
      id="basic-nav-dropdown"
      align={{ sm: "end" }}
    >
      <InputGroup className="mb-3 login-input">
        <InputGroup.Text id="inputGroup-sizing-default">Email</InputGroup.Text>
        <Form.Control
          id="sign-in-email-input"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <InputGroup className="mb-3 email-input">
        <InputGroup.Text id="inputGroup-sizing-default">
          Password
        </InputGroup.Text>
        <Form.Control
          id="sign-in-password-input"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <div className="login-btn">
        <NavDropdown.Item as={Link} to={"/"}>
          Sing in
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to={"/registration"}>
          Sign up
        </NavDropdown.Item>
      </div>
      <NavDropdown.Item
        className="login-forgot-password-btn"
        onClick={() => {
          setModalShow(true);
        }}
      >
        Forgot password?
      </NavDropdown.Item>
      <PopUp
        show={modalShow}
        onHide={() => setModalShow(false)}
        body={<ForgotPasswordPopUp />}
        title={"Forgot password?"}
        btn={"Send"}
      />
    </NavDropdown>
  );
};

export default LoginDropdownMenu;

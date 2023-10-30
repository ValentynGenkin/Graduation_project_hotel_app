import NavDropdown from "react-bootstrap/NavDropdown";
import { Form, InputGroup } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

import "./CSS/LoginDropdownMenu.css";

const LoginDropdownMenu = () => {
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
        as={Link}
        to={"/"}
      >
        Forgot password?
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default LoginDropdownMenu;

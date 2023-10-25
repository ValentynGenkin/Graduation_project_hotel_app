import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import LoginDropdownMenu from "./LoginDropdownMenu";
import { Link } from "react-router-dom";

import "./CSS/NavigationBar.css";

function NavigationBar() {
  return (
    <Container className="navigation-bar-container">
      <Navbar expand="lg" bg="light" className="navigation-bar ">
        <Navbar.Brand as={Link} to={"/"} className="navigation-bar-title">
          Hotel App{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto navigation-bar-links">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/"}>
              Rooms
            </Nav.Link>
            <Nav.Link as={Link} to={"/"}>
              Cervices
            </Nav.Link>
            <Nav.Link as={Link} to={"/"}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to={"/"}>
              Contact
            </Nav.Link>
            <LoginDropdownMenu />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default NavigationBar;

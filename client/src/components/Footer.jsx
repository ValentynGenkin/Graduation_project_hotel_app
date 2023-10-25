import Nav from "react-bootstrap/Nav";
import React from "react";
import { Link } from "react-router-dom";

import "./CSS/Footer.css";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="footer-container">
      <Nav className=" footer" activeKey="/home">
        <Nav.Item>
          <Nav.Link as={Link} to={"/"}>
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={"/"}>
            Rooms
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={"/"}>
            Services
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={"/"}>
            About
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={"/"}>
            Contact
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <p className="text-center mt-4 mb-4">Or right-aligned HYF 2023</p>
    </Container>
  );
};

export default Footer;

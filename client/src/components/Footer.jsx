import Nav from "react-bootstrap/Nav";
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

import "./CSS/Footer.css";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="client-footer-container">
      <Nav className="client-footer" activeKey="/home">
        <div className="client-footer-links">
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
        </div>
        <div className="client-footer-social-media">
          <Nav.Link as={Link} to="https://www.instagram.com">
            <FaInstagram className="icon-footer" />
          </Nav.Link>
          <Nav.Link as={Link} to="https://www.facebook.com">
            <FaFacebook className="icon-footer" />
          </Nav.Link>
          <Nav.Link as={Link} to="https://twitter.com/home">
            <FaTwitter className="icon-footer" />
          </Nav.Link>
          <Nav.Link as={Link} to="https://www.linkedin.com">
            <FaLinkedin className="icon-footer" />
          </Nav.Link>
        </div>
      </Nav>

      <p className="footer-paragraph">Finale Project HYF 2023</p>
    </Container>
  );
};

export default Footer;

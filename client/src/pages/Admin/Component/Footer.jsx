import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../CSS/Footer.css";

const Footer = () => {
  return (
    <div className="footer-container-admin">
      <Nav className="footer">
        <Nav.Item>
          <Nav.Link as={Link} to="https://www.facebook.com">
            <FaFacebook className="icon-footer" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="https://www.instagram.com">
            <FaInstagram className="icon-footer" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="https://twitter.com/home">
            <FaTwitter className="icon-footer" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="https://www.linkedin.com">
            <FaLinkedin className="icon-footer" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/">
            Our Website
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Footer;

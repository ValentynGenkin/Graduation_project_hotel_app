import React from "react";
import { Container } from "react-bootstrap";
import "./CSS/ClientCheckoutConfirmation.css";
import { MdFileDownloadDone } from "react-icons/md";

const ClientCheckoutConfirmation = () => {
  return (
    <Container className="client-checkout-confirmation-container">
      <h1 className="confirmation-done">
        <MdFileDownloadDone />
      </h1>
      <br />
      <h3>Thank You for your payment! </h3>
      <br />
      <h5>Total payment amount: 250.00 euro</h5>
      <br />
      <h6>Payment ID: 4564614345</h6>
      <br />
      <h6>Payment method: iDeal</h6>
      <br />
      <p>You will receive an email with your booking information.</p>
    </Container>
  );
};

export default ClientCheckoutConfirmation;

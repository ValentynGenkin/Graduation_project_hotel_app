import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import "./CSS/ClientCheckoutConfirmation.css";
import { MdFileDownloadDone } from "react-icons/md";
import useFetch from "../hooks/useFetch";

const ClientCheckoutConfirmation = () => {
  const [bookingData, setBookingData] = useState(null);
  const [response, setResponse] = useState(null);

  const bookingId = bookingData && bookingData.bookingInProcess._id;

  const { isLoading, error, performFetch } = useFetch(
    `/booking/status/${bookingId}`,
    (response) => {
      setResponse(response);
    }
  );

  useEffect(() => {
    if (localStorage.getItem("bookingInProcess")) {
      setBookingData(JSON.parse(localStorage.getItem("bookingInProcess")));
    } else {
      setBookingData(false);
    }
  }, []);

  useEffect(() => {
    performFetch();
  }, [bookingData]);

  useEffect(() => {}, [response]);

  return (
    <Container className="client-checkout-confirmation-container">
      {isLoading ? (
        <Spinner />
      ) : bookingData && bookingData !== false ? (
        error ? (
          <p>{error.toString()}</p>
        ) : (
          <>
            <h1 className="confirmation-done">
              <MdFileDownloadDone />
            </h1>
            <br />
            <h3>Thank You for your payment! </h3>
            <br />
            <h5>{`Total payment amount: €${bookingData.bookingInProcess.cost.$numberDecimal}`}</h5>
            <br />
            <h6>{`Booking ID: ${bookingData.bookingInProcess._id}`}</h6>
            <br />
            <h6>Payment method: iDeal</h6>
            <br />
            <h6>Payment status: ?????</h6>
            <br />
            <p>You will receive an email with your booking information.</p>
          </>
        )
      ) : (
        <div className="error-404">
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for could not be found.</p>
          <p>Please check the URL or go back to the homepage.</p>
        </div>
      )}
    </Container>
  );
};

export default ClientCheckoutConfirmation;

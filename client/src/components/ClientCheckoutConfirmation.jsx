import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import "./CSS/ClientCheckoutConfirmation.css";
import { MdFileDownloadDone } from "react-icons/md";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const ClientCheckoutConfirmation = () => {
  const [bookingData, setBookingData] = useState(null);
  const [response, setResponse] = useState(null);
  const navigation = useNavigate();
  const bookingId = bookingData && bookingData.bookingInProcess._id;
  const [firstRequestCompleted, setFirstRequestCompleted] = useState(false);
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
    if (bookingData) {
      performFetch({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    }
  }, [bookingData]);

  useEffect(() => {
    let statusTimeout;
    let redirectTimeout;

    const handleResponse = () => {
      if (response) {
        if (response.status === "pending") {
          statusTimeout = setTimeout(() => {
            performFetch({
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            });
          }, 1500);
        } else {
          statusTimeout = setTimeout(() => {
            navigation("/current-bookings");
          }, 5000);
        }
      }

      if (!firstRequestCompleted) {
        setFirstRequestCompleted(true);

        redirectTimeout = setTimeout(() => {
          navigation("/current-bookings");
        }, 3 * 60 * 1000);
      }
    };

    handleResponse();

    return () => {
      clearTimeout(statusTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [response]);

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
            {response && response.bookingStatus ? (
              <h6>{`Payment status: ${response.bookingStatus}`}</h6>
            ) : (
              <Spinner />
            )}

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

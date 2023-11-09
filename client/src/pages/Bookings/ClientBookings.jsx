import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import "../../components/CSS/ClientBookings.css";

import BookingRequestSender from "../../components/BookingRequestSender";
import ClientBookingItem from "../../components/ClientBookingItem";
import BookingControlBtn from "../../components/BookingControlBtn";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const ClientBookings = () => {
  const [response, setResponse] = useState(null);
  const navigation = useNavigate();
  const { isLoading, error, performFetch } = useFetch(
    "/customer/auth",
    (response) => {
      setResponse(response);
    }
  );

  useEffect(() => {
    performFetch({
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
  }, []);

  useEffect(() => {
    error &&
      setTimeout(() => {
        navigation("/");
      }, 3000);
  }, [error]);

  return (
    <Container className="client-booking-container">
      {isLoading ? (
        <Spinner as="div" animation="border" role="status" aria-hidden="true" />
      ) : response && response.success === true ? (
        <>
          <ClientBookingItem
            requestBlok={<BookingRequestSender />}
            bookingControl={<BookingControlBtn />}
          />
          <h4>Booking history:</h4>
          <ClientBookingItem />
        </>
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

export default ClientBookings;

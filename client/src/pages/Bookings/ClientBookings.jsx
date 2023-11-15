import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import "../../components/CSS/ClientBookings.css";
import {
  default as useFetchAuth,
  default as useFetchBookings,
} from "../../hooks/useFetch";
import BookingRequestSender from "../../components/BookingRequestSender";
import ClientBookingItem from "../../components/ClientBookingItem";
import { useNavigate } from "react-router-dom";

const ClientBookings = () => {
  const [authResponse, setAuthResponse] = useState(null);
  const [bookingResponse, setBookingResponse] = useState(null);
  const navigation = useNavigate();
  const {
    isLoading: isLoadingAuth,
    error: errorAuth,
    performFetch: performFetchAuth,
  } = useFetchAuth("/customer/auth", (response) => {
    setAuthResponse(response);
  });

  const {
    isLoading: isLoadingBookings,
    error: errorBookings,
    performFetch: performFetchBookings,
  } = useFetchBookings("/customer/bookings", (response) => {
    setBookingResponse(response);
    // console.log(response);
  });

  useEffect(() => {
    performFetchAuth({
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
  }, []);

  useEffect(() => {
    errorAuth &&
      setTimeout(() => {
        navigation("/");
      }, 3000);
  }, [errorAuth]);

  useEffect(() => {
    if (authResponse && authResponse.success === true) {
      performFetchBookings({
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
    }
  }, [authResponse]);

  return (
    <Container className="client-booking-container">
      {isLoadingAuth || isLoadingBookings ? (
        <Spinner as="div" animation="border" role="status" aria-hidden="true" />
      ) : authResponse && authResponse.success === true ? (
        errorBookings ? (
          <p>{errorBookings.toString()}</p>
        ) : (
          <>
            {bookingResponse.currentBookings.length >= 1 ? (
              <>
                <h4>Current bookings:</h4>
                {bookingResponse &&
                  bookingResponse.currentBookings.map((booking) => (
                    <ClientBookingItem
                      data={booking}
                      key={booking._id}
                      requestBlok={<BookingRequestSender />}
                    />
                  ))}
              </>
            ) : null}
            {bookingResponse.upComingBookings.length >= 1 ? (
              <>
                <h4>Upcoming bookings:</h4>
                {bookingResponse &&
                  bookingResponse.upComingBookings.map((booking) => (
                    <ClientBookingItem data={booking} key={booking._id} />
                  ))}
              </>
            ) : null}
            {bookingResponse.oldBookings.length >= 1 ? (
              <>
                <h4>Booking history:</h4>
                {bookingResponse &&
                  bookingResponse.oldBookings.map((booking) => (
                    <ClientBookingItem data={booking} key={booking._id} />
                  ))}
              </>
            ) : null}
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

export default ClientBookings;

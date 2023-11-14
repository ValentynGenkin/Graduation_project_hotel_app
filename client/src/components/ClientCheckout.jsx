import React, { useEffect, useState } from "react";
import { Accordion, Container, InputGroup, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Button } from "react-bootstrap";
import {
  default as useFetchAuth,
  default as useFetchRemoveRoom,
} from "../hooks/useFetch";
import { default as useFetchCheckout } from "../hooks/useFetch";
import "./CSS/ClientCheckout.css";
import Input from "./InputComponent";
import { useBookingContext } from "../contexts/BookingContext";
import { dateFormatter } from "../util/dateFormatter";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import iDealImg from "../assets/ideal.png";
import PayPalImg from "../assets/paypal.png";
import CreditCardImg from "../assets/credit-card.png";
import { isValidEmail } from "../util/emailValidation";
import { isValidName } from "../util/nameValidation";
import { isValidPhoneNumber } from "../util/phoneNumberValidation";

const ClientCheckout = () => {
  const serverDomain = window.location.origin;
  const { bookingContext, handleBookingContext } = useBookingContext();
  const navigation = useNavigate();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    birthday: "",
    payment: "",
    returnUrl: `${serverDomain}/checkout-confirmation`,
  });
  const [newDataCheck, setNewDataCheck] = useState({
    name: "none",
    email: "none",
    phone: "none",
    allData: "none",
  });
  const [inputChange, setInputChange] = useState(true);
  const [authResponse, setAuthResponse] = useState(null);
  const [checkoutResponse, setCheckoutResponse] = useState(true);
  const {
    isLoading: isLoadingAuth,
    error: errorAuth,
    performFetch: performFetchAuth,
  } = useFetchAuth("/customer/auth", (response) => {
    setAuthResponse(response);
  });

  useEffect(() => {
    performFetchAuth({
      method: "GET",
      credentials: "include",
      headers: { "content-type": "application/json" },
    });
  }, []);

  const {
    isLoading: isLoadingRemoveRoom,
    error: errorRemoveRoom,
    performFetch: performFetchRemoveRoom,
  } = useFetchRemoveRoom("/booking/removeRoomFromBooking", (response) => {
    if (response.success === true) {
      localStorage.setItem("booking", JSON.stringify(response.booking));
      handleBookingContext();
    }
  });

  const handleClick = (roomId, bookingId) => {
    performFetchRemoveRoom({
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: roomId,
        bookingDetailId: bookingId,
      }),
    });
  };

  const {
    isLoading: isLoadingCheckout,
    error: errorCheckout,
    performFetch: performFetchCheckout,
  } = useFetchCheckout("/booking/checkout", (response) => {
    setCheckoutResponse(response);
  });

  function dataCheck(obj) {
    for (const data in obj) {
      if (obj[data] === null || obj[data] === "") {
        return false;
      }
    }
    return true;
  }

  const handleCheckout = () => {
    if (!authResponse) {
      if (dataCheck(userData)) {
        performFetchCheckout({
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
      } else {
        setNewDataCheck({ ...newDataCheck, allData: "block" });
      }
    }

    if (authResponse && authResponse.success === true) {
      performFetchCheckout({
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ returnUrl: userData.returnUrl }),
      });
    }
  };

  useEffect(() => {
    if (checkoutResponse && checkoutResponse.success === true) {
      localStorage.setItem(
        "bookingInProcess",
        JSON.stringify(checkoutResponse)
      );
      window.location.href = checkoutResponse.redirectUrl;
    }
  }, [checkoutResponse]);

  useEffect(() => {
    if (authResponse && authResponse.success === true) {
      setInputChange(true);
      setUserData({
        ...userData,
        firstname: authResponse.customer.firstname,
        lastname: authResponse.customer.lastname,
        email: authResponse.customer.email,
        phone: authResponse.customer.phone,
        birthday: authResponse.customer.birthday,
      });
    } else {
      setInputChange(false);
    }
  }, [authResponse, errorAuth]);

  let totalCost = 0;

  if (bookingContext && bookingContext.bookingDetails) {
    bookingContext.bookingDetails.forEach((bookingDetail) => {
      const roomPrice = parseFloat(
        bookingDetail.roomId.roomPrice.$numberDecimal
      );
      const checkInDate = new Date(bookingDetail.checkIn);
      const checkOutDate = new Date(bookingDetail.checkOut);

      checkInDate.setHours(14, 0, 0, 0);
      checkOutDate.setHours(12, 0, 0, 0);

      const timeCorrection = 2 * 60 * 60 * 1000;
      const numberOfNights = Math.ceil(
        (checkOutDate - checkInDate - timeCorrection) / (1000 * 60 * 60 * 24)
      );

      const roomCost = numberOfNights * roomPrice;
      totalCost += roomCost;
    });
  }

  useEffect(() => {
    if (
      bookingContext &&
      bookingContext.bookingDetails &&
      bookingContext.bookingDetails.length <= 0
    )
      navigation(-1);
  }, [bookingContext.bookingDetails]);

  return (
    <Container className="client-checkout-container">
      <h5 className="checkout-title">Booking confirmation</h5>
      {!bookingContext.bookingDetails ? (
        <p>No rooms have been added to the order.</p>
      ) : isLoadingAuth || isLoadingCheckout ? (
        <Spinner as="div" animation="border" role="status" aria-hidden="true" />
      ) : (
        <>
          <div className="checkout-tourist-info">
            <h6 className="checkout-booking-title">Tourist information</h6>

            <Input
              id={"checkout-first-name"}
              type={"text"}
              label={"first name"}
              text={"First name"}
              changeability={inputChange}
              value={userData.firstname}
              cb={(e) => {
                setUserData({ ...userData, firstname: e.target.value });
                if (isValidName(e.target.value)) {
                  setNewDataCheck({ ...newDataCheck, name: "none" });
                } else {
                  setNewDataCheck({ ...newDataCheck, name: "block" });
                }
              }}
            />
            <Input
              id={"checkout-last-name"}
              type={"text"}
              label={"Last name"}
              text={"Last name"}
              changeability={inputChange}
              value={userData.lastname}
              cb={(e) => {
                setUserData({ ...userData, lastname: e.target.value });
                if (isValidName(e.target.value)) {
                  setNewDataCheck({ ...newDataCheck, name: "none" });
                } else {
                  setNewDataCheck({ ...newDataCheck, name: "block" });
                }
              }}
            />
            <p
              style={{
                display: newDataCheck.name,
                color: "red",
                fontSize: "11px",
              }}
            >
              The name should consist of letters only, with hyphens allowed, and
              should contain a minimum of two characters.
            </p>
            <Input
              id={"checkout-email"}
              type={"email"}
              label={"e-mail"}
              text={"E-mail"}
              changeability={inputChange}
              value={userData.email}
              cb={(e) => {
                setUserData({ ...userData, email: e.target.value });
                if (isValidEmail(e.target.value)) {
                  setNewDataCheck({ ...newDataCheck, email: "none" });
                } else {
                  setNewDataCheck({ ...newDataCheck, email: "block" });
                }
              }}
            />
            <p
              style={{
                display: newDataCheck.email,
                color: "red",
                fontSize: "11px",
              }}
            >
              Check e-mail format
            </p>
            <Input
              id={"checkout-phone-num"}
              type={"tel"}
              label={"Phone number"}
              text={"Phone number"}
              changeability={inputChange}
              value={userData.phone}
              cb={(e) => {
                setUserData({ ...userData, phone: e.target.value });
                if (isValidPhoneNumber(e.target.value)) {
                  setNewDataCheck({ ...newDataCheck, phone: "none" });
                } else {
                  setNewDataCheck({ ...newDataCheck, phone: "block" });
                }
              }}
            />
            <p
              style={{
                display: newDataCheck.phone,
                color: "red",
                fontSize: "11px",
              }}
            >
              Enter an international phone number starting with +
            </p>
            <Input
              id={"account-bday"}
              type={"date"}
              label={"Date of Birth"}
              text={"Date of Birth"}
              defaultValue={
                userData.birthday === ""
                  ? null
                  : dateFormatter(new Date(userData.birthday))
              }
              changeability={inputChange}
              cb={(e) => {
                setUserData({
                  ...userData,
                  birthday: new Date(e.target.value),
                });
              }}
            />
          </div>
          <h6 className="checkout-booking-title">Booking information</h6>
          {bookingContext.bookingDetails.map((item) => (
            <Accordion key={item._id} className="checkout-accordion">
              <Accordion.Item
                eventKey="0"
                style={{ border: "1px solid lightgrey" }}
              >
                <Accordion.Header className="checkout-accordion-header">
                  <div className="checkout-booking-info">
                    <div>
                      <p className="checkout-booking-info-title">Check-in:</p>
                      <p className="checkout-booking-info-value">
                        {dateFormatter(new Date(item.checkIn))}
                      </p>
                    </div>
                    <div>
                      <p className="checkout-booking-info-title">Check-out:</p>
                      <p className="checkout-booking-info-value">
                        {dateFormatter(new Date(item.checkOut))}
                      </p>
                    </div>
                    <div>
                      <p className="checkout-booking-info-title">Room type:</p>
                      <p className="checkout-booking-info-value room-type-value">
                        {item.roomId.roomType}
                      </p>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="accordion-body-block">
                  <div className="checkout-accordion-body">
                    <Carousel indicators={false} className="checkout-carousel">
                      {item.roomId.images.map((img) => (
                        <Carousel.Item key={img}>
                          <img
                            src={img}
                            alt="Room photo"
                            className="checkout-carousel-img"
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                    <div className="checkout-room-info">
                      <h6>{item.roomId.roomDescription}</h6>
                      <ul>
                        {item.roomId.facilities.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                      <h6>
                        Price per night: €{item.roomId.roomPrice.$numberDecimal}
                      </h6>
                    </div>
                  </div>
                  {errorRemoveRoom && <p>{errorRemoveRoom.toString()}</p>}
                  <div className="checkout-delete-room-btn">
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleClick(item.roomId._id, item._id);
                      }}
                    >
                      {isLoadingRemoveRoom ? (
                        <Spinner
                          as="div"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        "Delete room"
                      )}
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}

          <br />
          <div className="checkout-comments">
            <h6>Add comment</h6>
            <FloatingLabel controlId="floatingTextarea2" label="Comments">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
              />
            </FloatingLabel>

            {!inputChange && (
              <>
                <br />
                <InputGroup className="mb-3 payment-method-title">
                  <InputGroup.Text id="basic-addon1">
                    Payment method
                  </InputGroup.Text>
                </InputGroup>
                <Form>
                  <div
                    key="inline-radio"
                    className="mb-3 payment-method-select"
                  >
                    <div className="payment-method-select-component">
                      <img src={iDealImg} alt="ideal" />
                      <Form.Check
                        inline
                        name="group1"
                        type="radio"
                        id="inline-radio-1"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUserData({ ...userData, payment: "iDeal" });
                          }
                        }}
                      />
                    </div>
                    <div className="payment-method-select-component">
                      <img src={PayPalImg} alt="paypal" />
                      <Form.Check
                        inline
                        name="group1"
                        type="radio"
                        id="inline-radio-2"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUserData({ ...userData, payment: "PayPal" });
                          }
                        }}
                      />
                    </div>
                    <div className="payment-method-select-component">
                      <img src={CreditCardImg} alt="credit card" />
                      <Form.Check
                        inline
                        name="group1"
                        type="radio"
                        id="inline-radio-3"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUserData({
                              ...userData,
                              payment: "Credit card",
                            });
                          }
                        }}
                      />
                    </div>
                  </div>
                </Form>
              </>
            )}

            <br />
            <div className="checkout-amount">
              <p className="checkout-booking-info-title"> Total amount: </p>
              <p className="checkout-booking-info-value">€{totalCost}</p>
            </div>
            <p
              style={{
                display: newDataCheck.allData,
                color: "red",
                fontSize: "12px",
              }}
            >
              All fields are required
            </p>
            {errorCheckout && (
              <p style={{ color: "red" }}>{errorCheckout.toString()}</p>
            )}
            <div className="checkout-confirmation-btn">
              <Button
                variant="outline-secondary"
                className=""
                onClick={() => {
                  navigation(-1);
                }}
              >
                Back
              </Button>

              <Button
                variant="outline-secondary"
                onClick={() => {
                  handleCheckout();
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
          <br />
        </>
      )}
    </Container>
  );
};

export default ClientCheckout;

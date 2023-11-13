import NavDropdown from "react-bootstrap/NavDropdown";
import { Form, InputGroup } from "react-bootstrap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/LoginDropdownMenu.css";
import PopUp from "./PopUp";
import ForgotPasswordPopUp from "./ForgotPasswordPopUp";
import useFetch from "../hooks/useFetch";
import { isValidEmail } from "../util/emailValidation.js";
import { Spinner } from "react-bootstrap";
import LoggedDropdownMenu from "./LoggedDropdownMenu";
import PropTypes from "prop-types";
import { BookingContext } from "../contexts/BookingContext";
import Cookies from "js-cookie";

const LoginDropdownMenu = ({ res }) => {
  const [userData, setUserData] = useState({ email: null, password: null });
  const [response, setResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState("none");
  const [userName, setUserName] = useState("");
  const { handleBookingContext } = useContext(BookingContext);
  const [show, setShow] = useState();
  const menuRef = useRef(null);

  const { isLoading, error, performFetch } = useFetch(
    "/auth/login",
    (response) => {
      setResponse(response);
      if (Cookies.get("booking")) {
        handleBookingContext();
      }
    }
  );

  const userSignIn = () => {
    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShow();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (response && response.success === true) {
      location.reload();
      setShow();
    }
  }, [response]);

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    (res && setUserName(res.customer.firstname)) ||
      (response && setUserName(response.customer.firstname));
  }, [res, response]);

  return (
    <>
      {(response && response.success === true) ||
      (res && res.success === true) ? (
        <LoggedDropdownMenu name={userName} />
      ) : (
        <NavDropdown
          show={show}
          className="login-dropdown-menu"
          title="Login"
          id="basic-nav-dropdown"
          align={{ sm: "end" }}
        >
          <InputGroup className="mb-3 login-input">
            <InputGroup.Text id="inputGroup-sizing-default">
              Email
            </InputGroup.Text>
            <Form.Control
              id="sign-in-email-input"
              type="email"
              aria-label="Email"
              aria-describedby="inputGroup-sizing-default"
              onChange={(e) => {
                if (isValidEmail(e.target.value)) {
                  setUserData({ ...userData, email: e.target.value });
                } else {
                  setUserData({ ...userData, email: null });
                }
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3 email-input">
            <InputGroup.Text id="inputGroup-sizing-default">
              Password
            </InputGroup.Text>
            <Form.Control
              id="sign-in-password-input"
              type="password"
              aria-label="Password"
              aria-describedby="inputGroup-sizing-default"
              onChange={(e) => {
                if (e.target.value.length < 6) {
                  setUserData({ ...userData, password: null });
                } else {
                  setUserData({ ...userData, password: e.target.value });
                }
              }}
            />
          </InputGroup>
          <p
            style={{
              display: errorMsg,
              color: "red",
              textAlign: "center",
              marginBottom: "10px",
              padding: "0",
              fontSize: "11px",
            }}
          >
            Check e-mail or password
          </p>
          {error && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: "10px",
                padding: "0",
                fontSize: "11px",
              }}
            >
              {error.toString()}
            </p>
          )}
          <div className="login-btn">
            <NavDropdown.Item
              ref={menuRef}
              onClick={() => {
                setShow(true);
                if (userData.email !== null && userData.password !== null) {
                  setErrorMsg("none");
                  userSignIn();
                } else {
                  setErrorMsg("block");
                }
              }}
            >
              {isLoading ? (
                <Spinner
                  as="div"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Sign-in"
              )}
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/registration"}>
              Sign up
            </NavDropdown.Item>
          </div>

          <NavDropdown.Item
            className="login-forgot-password-btn"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Forgot password?
          </NavDropdown.Item>
          <PopUp
            show={modalShow}
            onHide={() => setModalShow(false)}
            body={<ForgotPasswordPopUp />}
            title={"Forgot password?"}
            btn={"Send"}
          />
        </NavDropdown>
      )}
    </>
  );
};

export default LoginDropdownMenu;

LoginDropdownMenu.propTypes = {
  res: PropTypes.object,
};

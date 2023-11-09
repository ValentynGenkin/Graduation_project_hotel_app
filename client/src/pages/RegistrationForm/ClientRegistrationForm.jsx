import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import iDealImg from "../../assets/ideal.png";
import PayPalImg from "../../assets/paypal.png";
import CreditCardImg from "../../assets/credit-card.png";
import Input from "../../components/InputComponent";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../util/emailValidation.js";
import { isValidName } from "../../util/nameValidation";
import { isValidPhoneNumber } from "../../util/phoneNumberValidation";

import "../../components/CSS/ClientRegistrationForm.css";
import ShowPasswordBtn from "../../components/ShowPasswordBtn";
import useFetch from "../../hooks/useFetch";

const ClientRegistrationForm = () => {
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState("password");
  const [errMsg, setErrMsg] = useState("none");
  const [emailCheck, setEmailCheck] = useState("none");
  const [checkName, setCheckName] = useState("none");
  const [checkPhone, setCheckPhone] = useState("grey");
  const [checkPassword, setCheckPassword] = useState({
    password: null,
    repeatPassword: null,
    error: "none",
    passwordLengthError: "grey",
  });

  const [response, setResponse] = useState(null);

  const [user, setUser] = useState({
    firstName: null,
    lastName: null,
    phone: null,
    password: null,
    email: null,
    birthday: null,
    payment: null,
    checked: null,
  });

  const { isLoading, error, performFetch } = useFetch(
    "/auth/register",
    (response) => {
      setResponse(response);
    }
  );

  const saveUser = () => {
    performFetch({
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: user.firstName,
        lastname: user.lastName,
        phone: user.phone,
        password: user.password,
        email: user.email,
        payment: user.payment,
        birthday: user.birthday,
      }),
    });
  };

  useEffect(() => {
    savePassword();
  }, [checkPassword]);

  useEffect(() => {
    if (response && response.success === true) {
      navigation("/");
    }
  }, [response]);

  function dataCheck(obj) {
    for (const key in obj) {
      if (obj[key] === null || obj[key] === undefined) {
        return false;
      }
    }
    return true;
  }

  const savePassword = () => {
    if (
      checkPassword.password === checkPassword.repeatPassword &&
      checkPassword.password !== undefined &&
      checkPassword.repeatPassword !== undefined &&
      checkPassword.password !== null &&
      checkPassword.repeatPassword !== null
    ) {
      setUser({ ...user, password: checkPassword.password });
    } else {
      setUser({ ...user, password: null });
    }
  };

  const showPasswordSwitch = () => {
    setShowPassword("text");
    if (showPassword === "text") setShowPassword("password");
  };

  return (
    <Container className="payment-method-container">
      <h5 className="registration-form-title">Registration form</h5>

      <div className="registration-form-inputs">
        <Input
          id={"registration-form-first-name"}
          type={"text"}
          label={"Username"}
          text={"First name"}
          cb={(e) => {
            if (!isValidName(e.target.value)) {
              setCheckName("block");
              setUser({ ...user, firstName: null });
            } else {
              setUser({ ...user, firstName: e.target.value });
              setCheckName("none");
            }
          }}
        />
        <Input
          id={"registration-form-last-name"}
          type={"text"}
          label={"Username"}
          text={"Last name"}
          cb={(e) => {
            if (!isValidName(e.target.value)) {
              setUser({ ...user, lastName: null });
              setCheckName("block");
            } else {
              setUser({ ...user, lastName: e.target.value });
              setCheckName("none");
            }
          }}
        />
        <p style={{ display: checkName, color: "red", fontSize: "11px" }}>
          The name should consist of letters only, with hyphens allowed, and
          should contain a minimum of two characters.
        </p>
        <Input
          id={"registration-form-email"}
          type={"email"}
          label={"E-mail"}
          text={"E-mail"}
          cb={(e) => {
            if (!isValidEmail(e.target.value)) {
              setUser({ ...user, email: null });
              setEmailCheck("block");
            } else {
              setUser({ ...user, email: e.target.value });
              setEmailCheck("none");
            }
          }}
        />
        <p style={{ display: emailCheck, color: "red", fontSize: "11px" }}>
          Check e-mail format
        </p>
        <Input
          id={"registration-form-phone-num"}
          type={"tel"}
          label={"Phone number"}
          text={"Phone number"}
          cb={(e) => {
            if (!isValidPhoneNumber(e.target.value)) {
              setUser({ ...user, phone: null });
              setCheckPhone("red");
            } else {
              setUser({ ...user, phone: e.target.value });
              setCheckPhone("grey");
            }
          }}
        />
        <p style={{ color: checkPhone, fontSize: "11px" }}>
          Enter an international phone number starting with +
        </p>
        <Input
          id={"registration-form-bday"}
          type={"date"}
          label={"Date of Birth"}
          text={"Date of Birth"}
          cb={(e) => {
            setUser({ ...user, birthday: new Date(e.target.value) });
          }}
        />

        <InputGroup className="mb-3 payment-method-title">
          <InputGroup.Text id="basic-addon1">Payment method</InputGroup.Text>
        </InputGroup>
      </div>
      <Form>
        <div key="inline-radio" className="mb-3 payment-method-select">
          <div className="payment-method-select-component">
            <img src={iDealImg} alt="ideal" />
            <Form.Check
              inline
              name="group1"
              type="radio"
              id="inline-radio-1"
              onChange={(e) => {
                if (e.target.checked) {
                  setUser({ ...user, payment: "iDeal" });
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
                  setUser({ ...user, payment: "PayPal" });
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
                  setUser({ ...user, payment: "Credit card" });
                }
              }}
            />
          </div>
        </div>
      </Form>
      <div className="registration-form-inputs">
        <Input
          id={"registration-form-password"}
          type={showPassword}
          label={"Password"}
          text={"Password"}
          cb={(e) => {
            if (e.target.value.length < 6) {
              setCheckPassword({ ...checkPassword, password: null });
            } else {
              setCheckPassword({ ...checkPassword, password: e.target.value });
            }
          }}
        />
        <Input
          id={"registration-form-repeat-password"}
          type={showPassword}
          label={"Password"}
          text={"Repeat password"}
          btn={<ShowPasswordBtn cb={showPasswordSwitch} />}
          cb={(e) => {
            if (e.target.value.length < 6) {
              setCheckPassword({ ...checkPassword, repeatPassword: null });
            } else {
              setCheckPassword({
                ...checkPassword,
                repeatPassword: e.target.value,
              });
            }
          }}
          onBlur={() => {
            if (checkPassword.password !== checkPassword.repeatPassword) {
              setCheckPassword({
                ...checkPassword,
                error: "block",
                passwordLengthError: "grey",
              });
            } else {
              if (
                checkPassword.password === null ||
                checkPassword.repeatPassword === null ||
                checkPassword.password.length < 6 ||
                checkPassword.repeatPassword.length < 6
              ) {
                setCheckPassword({
                  ...checkPassword,
                  passwordLengthError: "red",
                });
              } else {
                setCheckPassword({
                  ...checkPassword,
                  passwordLengthError: "grey",
                  error: "none",
                });
              }
            }
          }}
        />
        <p
          style={{
            display: checkPassword.error,
            color: "red",
            fontSize: "11px",
          }}
        >
          Passwords do not match. Please ensure both passwords are identical
        </p>
        <p
          style={{ color: checkPassword.passwordLengthError, fontSize: "11px" }}
        >
          The password must contain at least 6 characters
        </p>
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="I agree ........"
            onChange={(e) => {
              if (e.target.checked) {
                setUser({ ...user, checked: true });
              } else {
                setUser({ ...user, checked: null });
              }
            }}
          />
        </Form>
        <div className="sign-in-cancel-btn-block">
          <p style={{ display: errMsg, color: "red", fontSize: "12px" }}>
            All fields are required
          </p>
          {error && (
            <p style={{ color: "red", fontSize: "11px" }}>{error.toString()}</p>
          )}
          <Button
            variant="outline-secondary"
            onClick={() => {
              if (dataCheck(user)) {
                setErrMsg("none");
                saveUser();
              } else {
                setErrMsg("block");
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
              "Sign-up"
            )}
          </Button>

          <Button
            variant="outline-secondary"
            onClick={() => {
              navigation(-1);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ClientRegistrationForm;

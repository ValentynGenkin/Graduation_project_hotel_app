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

import "../../components/CSS/ClientRegistrationForm.css";
import ShowPasswordBtn from "../../components/ShowPasswordBtn";
import useFetch from "../../hooks/useFetch";

const ClientRegistrationForm = () => {
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState("password");
  const [errMsg, setErrMsg] = useState("none");
  const [emailCheck, setEmailCheck] = useState("none");
  const [loading, setLoading] = useState("none");
  const [checkPassword, setCheckPassword] = useState({
    password: null,
    repeatPassword: null,
  });

  const [response, setResponse] = useState(null);

  const [user, setUser] = useState({
    firstName: null,
    lastName: null,
    phone: null,
    password: null,
    email: null,
    checked: null,
  });

  const { isLoading, error, performFetch } = useFetch(
    "/auth/register",
    (response) => {
      setResponse(response);
    }
  );

  useEffect(() => {
    isLoading ? setLoading("inline-block") : setLoading("none");
  }, [isLoading]);

  const saveUser = () => {
    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: user.firstName,
        lastname: user.lastName,
        phone: user.phone,
        password: user.password,
        email: user.email,
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
      !isNaN(checkPassword.password) &&
      !isNaN(checkPassword.repeatPassword) &&
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
            if (e.target.value.length === 0) {
              setUser({ ...user, firstName: null });
            } else {
              setUser({ ...user, firstName: e.target.value });
            }
          }}
        />
        <Input
          id={"registration-form-last-name"}
          type={"text"}
          label={"Username"}
          text={"Last name"}
          cb={(e) => {
            if (e.target.value.length === 0) {
              setUser({ ...user, lastName: null });
            } else {
              setUser({ ...user, lastName: e.target.value });
            }
          }}
        />
        <Input
          id={"registration-form-email"}
          type={"email"}
          label={"E-mail"}
          text={"E-mail"}
          cb={(e) => {
            if (!isValidEmail(e.target.value)) {
              setUser({ ...user, email: null });
            } else {
              setUser({ ...user, email: e.target.value });
            }
          }}
          onBlur={(e) => {
            if (!isValidEmail(e.target.value)) {
              setEmailCheck("block");
            } else {
              setEmailCheck("none");
            }
          }}
        />
        <p style={{ display: emailCheck, color: "red", fontSize: "12px" }}>
          {" "}
          Check e-mail format
        </p>
        <Input
          id={"registration-form-phone-num"}
          type={"tel"}
          label={"Phone number"}
          text={"Phone number"}
          cb={(e) => {
            if (e.target.value.length === 0) {
              setUser({ ...user, phone: null });
            } else {
              setUser({ ...user, phone: e.target.value });
            }
          }}
        />
        <Input
          id={"registration-form-bday"}
          type={"date"}
          label={"Date of Birth"}
          text={"Date of Birth"}
        />

        <InputGroup className="mb-3 payment-method-title">
          <InputGroup.Text id="basic-addon1">Payment method</InputGroup.Text>
        </InputGroup>
      </div>
      <Form>
        <div key="inline-radio" className="mb-3 payment-method-select">
          <div className="payment-method-select-component">
            <img src={iDealImg} alt="ideal" />
            <Form.Check inline name="group1" type="radio" id="inline-radio-1" />
          </div>
          <div className="payment-method-select-component">
            <img src={PayPalImg} alt="paypal" />
            <Form.Check inline name="group1" type="radio" id="inline-radio-2" />
          </div>
          <div className="payment-method-select-component">
            <img src={CreditCardImg} alt="credit card" />
            <Form.Check inline name="group1" type="radio" id="inline-radio-3" />
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
        />
        <p style={{ color: "grey", fontSize: "12px" }}>
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
            <p style={{ color: "red", fontSize: "12px" }}>{error.toString()}</p>
          )}
          <Button
            variant="outline-secondary"
            onClick={async () => {
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
                style={{ display: loading }}
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

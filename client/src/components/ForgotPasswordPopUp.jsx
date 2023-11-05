import { Spinner } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import Input from "./InputComponent";
import React, { useEffect, useState } from "react";

const ForgotPasswordPopUp = () => {
  const [emailInputValue, setEmailInputValue] = useState();
  const [response, setResponse] = useState(null);
  const { isLoading, error, performFetch } = useFetch(
    "/auth/forgotpassword",
    (response) => {
      setResponse(response);
    }
  );

  const sendRequest = (email) => {
    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
  };

  useEffect(() => {
    const btn = document.getElementById("popup-submit-btn");
    if (btn) {
      const handleClick = () => {
        sendRequest(emailInputValue);
      };
      btn.addEventListener("click", handleClick);
      return () => {
        btn.removeEventListener("click", handleClick);
      };
    }
  }, [emailInputValue]);

  return (
    <div className="forgot-password-popup-body">
      {isLoading ? (
        <Spinner />
      ) : response && response.success === true ? (
        <p>Check e-mail</p>
      ) : (
        <p>{error && error.toString()}</p>
      )}
      <p>
        Enter your email address and you will receive an email with instructions
      </p>
      <Input
        id={"forgot-password-input"}
        type={"email"}
        label={"E-mail"}
        text={"E-mail"}
        cb={(e) => {
          setEmailInputValue(e.target.value);
        }}
      />
    </div>
  );
};

export default ForgotPasswordPopUp;

import React, { useEffect, useState } from "react";
import Input from "./InputComponent";

import "./CSS/DeleteAccountPopUp.css";
import ShowPasswordBtn from "./ShowPasswordBtn";
import useFetch from "../hooks/useFetch";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DeleteAccountConfirmation = () => {
  const [showPassword, setShowPassword] = useState("password");
  const [password, setPassword] = useState(null);
  const [response, setResponse] = useState(null);
  const { isLoading, error, performFetch } = useFetch(
    "/customer/delete",
    (response) => {
      setResponse(response);
    }
  );
  const navigation = useNavigate();

  const sendRequest = (password) => {
    performFetch({
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
    });
  };

  useEffect(() => {
    const btn = document.getElementById("popup-submit-btn");
    if (btn) {
      const handleClick = () => {
        sendRequest(password);
      };
      btn.addEventListener("click", handleClick);
      return () => {
        btn.removeEventListener("click", handleClick);
      };
    }
  }, [password]);

  useEffect(() => {
    if (response && response.success === true) {
      const btn = document.getElementById("popup-submit-btn");
      const body = document.getElementById("delete-account-popup-body");
      btn.style.display = "none";
      body.style.display = "none";

      setTimeout(() => {
        navigation("/");
        location.reload();
      }, 2000);
    }
  }, [response]);

  const showPasswordSwitch = () => {
    setShowPassword("text");
    if (showPassword === "text") setShowPassword("password");
  };

  return (
    <div className="delete-account">
      {isLoading ? (
        <Spinner
          as="div"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : response && response.success === true ? (
        <p>Account deleted successfully.</p>
      ) : (
        <p style={{ color: "red", fontSize: "12px" }}>
          {error && error.toString()}
        </p>
      )}
      <div id="delete-account-popup-body">
        <h5>
          Enter your password to delete your account.
          <br />
          All data and past bookings will be deleted.
        </h5>

        <Input
          id={"delete-account-password"}
          type={showPassword}
          label={"Password"}
          text={"Password"}
          btn={<ShowPasswordBtn cb={showPasswordSwitch} />}
          cb={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default DeleteAccountConfirmation;

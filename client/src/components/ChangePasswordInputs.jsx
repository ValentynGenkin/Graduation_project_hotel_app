import React, { useEffect, useState } from "react";
import Input from "./InputComponent";
import { Spinner } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import "./CSS/ChangePasswordPopUp.css";
import ShowPasswordBtn from "./ShowPasswordBtn";

const ChangePasswordInputs = () => {
  const [showPassword, setShowPassword] = useState("password");

  const showPasswordSwitch = () => {
    setShowPassword("text");
    if (showPassword === "text") setShowPassword("password");
  };

  const [password, setPassword] = useState({
    currentPassword: null,
    newPassword: null,
    repeatNewPassword: null,
    passwordError: "grey",
    passwordNotMatch: "none",
  });
  const [response, setResponse] = useState(null);
  const { isLoading, error, performFetch } = useFetch(
    "/auth/changepassword",
    (response) => {
      setResponse(response);
    }
  );

  const sendRequest = (password) => {
    if (password.newPassword === password.repeatNewPassword) {
      if (
        password.newPassword &&
        password.repeatNewPassword &&
        password.currentPassword
      ) {
        performFetch({
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword: password.currentPassword,
            newPassword: password.newPassword,
            repeatNewPassword: password.repeatNewPassword,
          }),
        });
      } else {
        setPassword({ ...password, passwordError: "red" });
      }
    } else {
      setPassword({ ...password, passwordNotMatch: "block" });
    }
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
    const btn = document.getElementById("popup-submit-btn");
    const body = document.getElementById("change-password-popup-body");
    if (response) {
      btn.style.display = "none";
      body.style.display = "none";
    }
  }, [response]);

  return (
    <div className="change-password-inputs">
      {isLoading ? (
        <Spinner
          as="div"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : response && response.success === true ? (
        <p>Password changed successfully.</p>
      ) : (
        <p style={{ color: "red", fontSize: "12px" }}>
          {error && error.toString()}
        </p>
      )}
      <div id="change-password-popup-body">
        <Input
          id={"change-password-current"}
          type={showPassword}
          label={"Password"}
          text={"Current password"}
          cb={(e) => {
            if (e.target.value.length < 6) {
              setPassword({ ...password, currentPassword: null });
            } else {
              setPassword({ ...password, currentPassword: e.target.value });
            }
          }}
        />

        <br />

        <Input
          id={"change-password-new-pass"}
          type={showPassword}
          label={"Password"}
          text={"New password"}
          cb={(e) => {
            if (e.target.value.length < 6) {
              setPassword({ ...password, newPassword: null });
            } else {
              setPassword({ ...password, newPassword: e.target.value });
            }
          }}
        />

        <Input
          id={"change-password-repeat-new-pass"}
          type={showPassword}
          label={"Password"}
          text={"Repeat new password"}
          btn={<ShowPasswordBtn cb={showPasswordSwitch} />}
          cb={(e) => {
            if (e.target.value.length < 6) {
              setPassword({ ...password, repeatNewPassword: null });
            } else {
              setPassword({ ...password, repeatNewPassword: e.target.value });
            }
          }}
        />
        <p style={{ color: password.passwordError, fontSize: "11px" }}>
          The password must contain at least 6 characters
        </p>
        <p
          style={{
            display: password.passwordNotMatch,
            color: "red",
            fontSize: "11px",
          }}
        >
          Passwords do not match. Please ensure both passwords are identical
        </p>
      </div>
    </div>
  );
};

export default ChangePasswordInputs;

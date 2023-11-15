import React, { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import Input from "../../components/InputComponent";
import ShowPasswordBtn from "../../components/ShowPasswordBtn";

import "../../components/CSS/PasswordReset.css";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const PasswordReset = () => {
  const [showPassword, setShowPassword] = useState("password");
  const [newPassword, setNewPassword] = useState({
    password: null,
    repeatPassword: null,
    error: "none",
    passwordLengthError: "grey",
  });
  const [response, setResponse] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    response &&
      setTimeout(() => {
        navigation("/");
      }, 3000);
  }, [response]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const URL = searchParams.get("reset_password_url");

  function extractPathFromURL(link) {
    const startIndex = link.indexOf("/api/");
    if (startIndex !== -1) {
      return link.substring(startIndex + 4);
    }
    return link;
  }

  const extractedPath = extractPathFromURL(URL);

  const { isLoading, error, performFetch } = useFetch(
    extractedPath,
    (response) => {
      setResponse(response);
    }
  );

  const resetPassword = () => {
    if (
      newPassword.password === newPassword.repeatPassword &&
      newPassword.password !== undefined &&
      newPassword.repeatPassword !== undefined &&
      newPassword.password !== null &&
      newPassword.repeatPassword !== null
    ) {
      performFetch({
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPassword.repeatPassword,
        }),
      });
    }
  };

  const showPasswordSwitch = () => {
    setShowPassword("text");
    if (showPassword === "text") setShowPassword("password");
  };

  return (
    <Container className="reset-password-container">
      <div className="reset-password-block">
        <h5>Create new password</h5>
        <br />
        <div className="reset-password-inputs">
          <Input
            id={"reset-password-new-pass"}
            type={showPassword}
            label={"Password"}
            text={"New password"}
            cb={(e) => {
              if (e.target.value.length < 6) {
                setNewPassword({ ...newPassword, password: null });
              } else {
                setNewPassword({ ...newPassword, password: e.target.value });
              }
            }}
          />

          <Input
            id={"reset-password-repeat-new-pass"}
            type={showPassword}
            label={"Password"}
            text={"Repeat password"}
            btn={<ShowPasswordBtn cb={showPasswordSwitch} />}
            cb={(e) => {
              if (e.target.value.length < 6) {
                setNewPassword({
                  ...newPassword,
                  repeatPassword: null,
                });
              } else {
                setNewPassword({
                  ...newPassword,
                  repeatPassword: e.target.value,
                });
              }
            }}
            onBlur={() => {
              if (newPassword.password !== newPassword.repeatPassword) {
                setNewPassword({
                  ...newPassword,
                  error: "block",
                  passwordLengthError: "grey",
                });
              } else {
                if (
                  newPassword.password === null ||
                  newPassword.repeatPassword === null ||
                  newPassword.password.length < 6 ||
                  newPassword.repeatPassword.length < 6
                ) {
                  setNewPassword({
                    ...newPassword,
                    passwordLengthError: "red",
                  });
                } else {
                  setNewPassword({
                    ...newPassword,
                    passwordLengthError: "grey",
                    error: "none",
                  });
                }
              }
            }}
          />

          <p
            style={{
              display: newPassword.error,
              color: "red",
              fontSize: "11px",
            }}
          >
            Passwords do not match. Please ensure both passwords are identical
          </p>
          <p
            style={{
              color: newPassword.passwordLengthError,
              fontSize: "11px",
            }}
          >
            The password must contain at least 6 characters
          </p>
          {response && response.success === true ? (
            <p>New password saved. You will be redirected to the main page.</p>
          ) : null}
          {error && (
            <p
              style={{
                color: "red",
                fontSize: "11px",
              }}
            >
              {error.toString()}
            </p>
          )}
        </div>
        <br />
        <Button
          variant="secondary"
          onClick={() => {
            resetPassword();
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
            "Save"
          )}
        </Button>
      </div>
    </Container>
  );
};

export default PasswordReset;

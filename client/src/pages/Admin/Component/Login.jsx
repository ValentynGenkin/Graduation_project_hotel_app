import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Loginform.css";
import hotelReception from "../Icons/hotel reception.jpg";
import useFetch from "../../../hooks/useFetch";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [addError, setAddError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [errMsg, setErrMsg] = useState(false);

  const navigate = useNavigate();
  const onSuccess = (res) => {
    localStorage.setItem("admin", JSON.stringify(res.admin));
    navigate("/admin");
  };

  const { error, isLoading, performFetch } = useFetch("/admin/login", (res) =>
    onSuccess(res)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const executeLogin = () => {
    const { email, password } = formData;
    if (email && password) {
      performFetch({
        method: "POST",
        body: JSON.stringify(formData),
      });
    } else {
      setErrMsg(true);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    executeLogin();
  };

  useEffect(() => {
    if (success || addError || inputError) {
      const timeout = setTimeout(() => {
        setSuccess(false);
        setInputError(true);
        setAddError(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [success, addError, inputError]);

  useEffect(() => {
    if (error) {
      setAddError(true);

      const timeout = setTimeout(() => {
        setAddError(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <div className="loginPageWrapper">
      <div className="container-admin-from">
        <form onSubmit={handleLogin} className="login-form-admin">
          <h2 className="login-title-admin"></h2>
          {error && <p className="error-message">{error.message}</p>}
          <div className="form-group-admin">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input-admin"
            />
          </div>
          <div className="form-group-admin">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input-admin"
            />
          </div>
          <button
            type="submit"
            className="login-button-admin"
            disabled={isLoading}
          >
            Login
          </button>
          {errMsg && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
                color: "red",
              }}
            >
              Wrong Credentials
            </div>
          )}
        </form>
      </div>
      <div className="loginImgContainer">
        <img
          src={hotelReception}
          alt="reception"
          className="receptionImg"
        ></img>
      </div>
    </div>
  );
};

export default LoginForm;

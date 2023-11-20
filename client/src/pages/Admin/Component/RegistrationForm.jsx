import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import "../CSS/Registration.css";
import PropTypes from "prop-types";

const RegistrationForm = ({ reload, setReload }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [inputError, setInputError] = useState(false);
  const [inputErrorMsg, setInputErrorMsg] = useState();
  const [addError, setAddError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { isLoading, error, performFetch } = useFetch("/admin/register", () => {
    setReload(!reload);
    setSuccess(true);
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveAdmin = (data) => {
    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstname, lastname, email, phone, password, confirmPassword } =
      formData;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setInputError(true);
      setInputErrorMsg("Please fill in all fields");
    } else if (password !== confirmPassword) {
      setInputError(true);
      setInputErrorMsg("Passwords do not match");
    } else {
      saveAdmin(formData);
    }
  };

  useEffect(() => {
    if (success || addError || inputError) {
      const timeout = setTimeout(() => {
        setSuccess(false);
        setInputError(false);
        setAddError(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [success, addError, inputError]);

  useEffect(() => {
    if (error) {
      setAddError(true);
    }

    if (addError) {
      let timeout = setTimeout(() => {
        setAddError(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [error, addError]);
  return (
    <div className="admin-registrationFormWrapper">
      <h1>Add new Admin</h1>
      {isLoading && <p>Loading...</p>}
      <form onSubmit={handleSubmit} className="admin-registration-form">
        <div className="admin-form-group">
          <label htmlFor="username">FirstName:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
          />
        </div>
        <div className="admin-form-group">
          <label htmlFor="username">LastName:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div className="admin-form-group">
          <label htmlFor="username">Phone number:</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="admin-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="admin-form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="admin-form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="room-register-button"
          style={{
            backgroundColor: inputError
              ? "red"
              : success
              ? "green"
              : addError
              ? "orange"
              : "blue",
          }}
        >
          {inputError
            ? inputErrorMsg
            : success
            ? "Success"
            : addError
            ? "Failed"
            : "Add admin"}
        </button>
        <div
          style={{
            width: "50%",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        ></div>
      </form>
    </div>
  );
};
RegistrationForm.propTypes = {
  reload: PropTypes.bool.isRequired,
  setReload: PropTypes.func.isRequired,
};

export default RegistrationForm;

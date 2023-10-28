import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (email === "HYF@gmail.com" && password === "admin") {
      // Redirect to "/Admin" if email and password match
      navigate("/Admin");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div>
      <div className="container-admin-from">
        <h2 className="login-title-admin">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin} className="login-form-admin">
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
          <button type="submit" className="login-button-admin">
            Login
          </button>
        </form>
      </div>
      <div className="message-container-admin">
        <p></p>
      </div>
    </div>
  );
};

export default LoginForm;

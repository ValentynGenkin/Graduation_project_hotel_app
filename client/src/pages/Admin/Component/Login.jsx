import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Remove the useHistory import
import "../CSS/Loginform.css";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    // Replace this with your actual login logic.
    const { email, password } = formData;

    if (email === "HYF@gmail.com" && password === "admin") {
      // Use navigate to redirect to "/Admin" on successful login
      navigate("/Admin");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6">
          <div className="d-flex flex-row ps-5 pt-5">
            <i
              className="fas fa-crow fa-3x me-3"
              style={{ color: "#709085" }}
            ></i>
          </div>
          <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
            <h3
              className="fw-normal mb-3 ps-5 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Login Form
            </h3>
            <div className="mb-4 mx-5 w-100">
              <label>Email address</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 mx-5 w-100">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
            <p className="small mb-5 pb-lg-3 ms-5">
              <a className="text-muted" href="#!">
                Forgot password?
              </a>
            </p>
            <p className="ms-5">
              Do not have an account?{" "}
              <Link to="/Register" className="link-info">
                Register here
              </Link>
            </p>
          </div>
        </div>
        <div className="col-sm-6 d-none d-sm-block px-0">
          <img
            src={require("../Icons/hotel reception.jpg").default}
            alt="Login image"
            className="w-100"
            style={{ objectFit: "cover", objectPosition: "left" }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

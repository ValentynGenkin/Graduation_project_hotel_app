import React from "react";
import ShowPassImg from "../assets/show-password.png";
import PropTypes from "prop-types";

import "./CSS/ShowPasswordBtn.css";

const ShowPasswordBtn = ({ cb }) => {
  return (
    <img
      src={ShowPassImg}
      alt="show password"
      className="show-password-btn"
      onClick={cb}
    />
  );
};

export default ShowPasswordBtn;

ShowPasswordBtn.propTypes = {
  cb: PropTypes.func.isRequired,
};

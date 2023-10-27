import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import PropTypes from "prop-types";

const Input = ({ type, label, text, btn, changeability, placeholder }) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id="basic-addon1">{text}</InputGroup.Text>
      <Form.Control
        type={type}
        aria-label={label}
        aria-describedby="basic-addon1"
        disabled={changeability}
        placeholder={placeholder}
      />
      {btn}
    </InputGroup>
  );
};

export default Input;

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  btn: PropTypes.element,
  changeability: PropTypes.bool,
  placeholder: PropTypes.string,
};

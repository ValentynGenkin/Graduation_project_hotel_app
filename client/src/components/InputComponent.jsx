import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import PropTypes from "prop-types";

const Input = ({
  id,
  type,
  label,
  text,
  btn,
  changeability,
  placeholder,
  cb,
  onBlur,
}) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id="basic-addon1">{text}</InputGroup.Text>
      <Form.Control
        id={id}
        type={type}
        aria-label={label}
        aria-describedby="basic-addon1"
        disabled={changeability}
        placeholder={placeholder}
        onChange={cb}
        onBlur={onBlur}
      />
      {btn}
    </InputGroup>
  );
};

export default Input;

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  btn: PropTypes.element,
  changeability: PropTypes.bool,
  placeholder: PropTypes.string,
  cb: PropTypes.func,
  onBlur: PropTypes.func,
};

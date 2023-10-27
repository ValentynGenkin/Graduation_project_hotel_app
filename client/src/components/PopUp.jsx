import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import PropTypes from "prop-types";

function PopUp(props) {
  const { body, title, btn } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.onHide}>
          {btn}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PopUp;

PopUp.propTypes = {
  body: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  btn: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
};

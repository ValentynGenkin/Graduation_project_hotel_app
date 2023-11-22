import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import Zoom from "../assets/zoom.png";
import PropTypes from "prop-types";

function FullScreenPopUp({ body, title }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        className="zoom-btn"
        variant="light"
        onClick={() => setShow(true)}
      >
        <img src={Zoom} alt="zoom" />
      </Button>

      <Modal
        size="xl"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
      </Modal>
    </>
  );
}

export default FullScreenPopUp;

FullScreenPopUp.propTypes = {
  body: PropTypes.element.isRequired,
  title: PropTypes.element.isRequired,
};

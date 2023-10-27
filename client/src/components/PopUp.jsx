import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import PropTypes from "prop-types";

function PopUp(props) {
  const { PopUpInfo, Title, ButtonTitle } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{Title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{PopUpInfo}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.onHide}>
          {ButtonTitle}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PopUp;

PopUp.propTypes = {
  PopUpInfo: PropTypes.element.isRequired,
  Title: PropTypes.string.isRequired,
  ButtonTitle: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
};

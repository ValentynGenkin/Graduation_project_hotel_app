import { Container } from "react-bootstrap";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import PopUp from "./PopUp";

import "./CSS/ExistAccountInfo.css";
import ChangePasswordInputs from "./ChangePasswordInputs";
import DeleteAccountConfirmation from "./DeleteAccountConfirmation";

const ExistAccountInfo = () => {
  const [update, setUpdate] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [popUpProp, setPopUpProp] = useState("");
  const [popUpTitle, setPopUpTitle] = useState("");
  const [btnTitle, setBtnTitle] = useState("");

  const accountUpdate = () => {
    setUpdate(!update);
  };

  return (
    <Container className="exist-account-container">
      <h5 className="exist-account-title">Account info</h5>
      <div className="exist-account-form-inputs">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">First name</InputGroup.Text>
          <Form.Control
            type="text"
            aria-label="Username"
            aria-describedby="basic-addon1"
            disabled={update}
            placeholder="First name"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Last name</InputGroup.Text>
          <Form.Control
            type="text"
            aria-label="Username"
            aria-describedby="basic-addon1"
            disabled={update}
            placeholder="Last name"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">E-mail</InputGroup.Text>
          <Form.Control
            aria-label="Username"
            aria-describedby="basic-addon1"
            type="email"
            disabled={update}
            placeholder="qwerty@qwerty.com"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Phone number</InputGroup.Text>
          <Form.Control
            aria-label="Username"
            aria-describedby="basic-addon1"
            type="tel"
            disabled={update}
            placeholder="0681234567"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Date of Birth</InputGroup.Text>
          <Form.Control
            aria-label="Username"
            aria-describedby="basic-addon1"
            type="text"
            disabled={update}
            maxlength="11"
            placeholder="12.07.1987"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Payment method</InputGroup.Text>
          <Form.Control
            aria-label="Username"
            aria-describedby="basic-addon1"
            type="text"
            disabled={update}
            placeholder="iDeal"
          />
        </InputGroup>
      </div>

      <div className="exist-account-form-inputs">
        <div className="exist-account-btn-block">
          <Button
            variant="outline-secondary"
            onClick={() => {
              accountUpdate();
            }}
          >
            {!update ? "Save" : "Update"}
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setPopUpTitle("Change password");
              setPopUpProp(<ChangePasswordInputs />);
              setBtnTitle("Save");
              setModalShow(true);
            }}
          >
            Change password
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => {
              setPopUpTitle("Delete account");
              setPopUpProp(<DeleteAccountConfirmation />);
              setBtnTitle("Delete");
              setModalShow(true);
            }}
          >
            Delete account
          </Button>
        </div>
      </div>

      <PopUp
        show={modalShow}
        onHide={() => setModalShow(false)}
        PopUpInfo={popUpProp}
        Title={popUpTitle}
        ButtonTitle={btnTitle}
      />
    </Container>
  );
};

export default ExistAccountInfo;

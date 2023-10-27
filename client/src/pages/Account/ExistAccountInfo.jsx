import { Container } from "react-bootstrap";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import PopUp from "../../components/PopUp";

import "../../components/CSS/ExistAccountInfo.css";
import ChangePasswordInputs from "../../components/ChangePasswordInputs";
import DeleteAccountConfirmation from "../../components/DeleteAccountConfirmation";
import Input from "../../components/Input";

const ExistAccountInfo = () => {
  const [update, setUpdate] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [popUpProp, setPopUpProp] = useState(<></>);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [btnTitle, setBtnTitle] = useState("");

  const accountUpdate = () => {
    setUpdate(!update);
  };

  return (
    <Container className="exist-account-container">
      <h5 className="exist-account-title">Account info</h5>
      <div className="exist-account-form-inputs">
        <Input
          type={"text"}
          label={"Username"}
          text={"First name"}
          placeholder={"First name"}
          changeability={update}
        />
        <Input
          type={"text"}
          label={"Username"}
          text={"Last name"}
          placeholder={"Last name"}
          changeability={update}
        />
        <Input
          type={"text"}
          label={"Email"}
          text={"E-mail"}
          placeholder={"qwerty@qwerty.com"}
          changeability={update}
        />
        <Input
          type={"tel"}
          label={"Phone number"}
          text={"Phone number"}
          placeholder={"0681234567"}
          changeability={update}
        />
        <Input
          type={"text"}
          label={"Date of Birth"}
          text={"Date of Birth"}
          placeholder={"12.07.1987"}
          changeability={update}
        />
        <Input
          type={"text"}
          label={"Payment method"}
          text={"Payment method"}
          placeholder={"iDeal"}
          changeability={update}
        />
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
        body={popUpProp}
        title={popUpTitle}
        btn={btnTitle}
      />
    </Container>
  );
};

export default ExistAccountInfo;

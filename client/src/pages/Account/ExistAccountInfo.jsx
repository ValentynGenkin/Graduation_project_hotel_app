import { Container, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import PopUp from "../../components/PopUp";
import { useNavigate } from "react-router-dom";
import "../../components/CSS/ExistAccountInfo.css";
import ChangePasswordInputs from "../../components/ChangePasswordInputs";
import DeleteAccountConfirmation from "../../components/DeleteAccountConfirmation";
import Input from "../../components/InputComponent";
import useFetch from "../../hooks/useFetch";

const ExistAccountInfo = () => {
  const [update, setUpdate] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [popUpProp, setPopUpProp] = useState(<></>);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [btnTitle, setBtnTitle] = useState("");
  const [response, setResponse] = useState(null);
  const navigation = useNavigate();
  const { isLoading, error, performFetch } = useFetch(
    "/customer/auth",
    (response) => {
      setResponse(response);
    }
  );

  useEffect(() => {
    performFetch({
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
  }, []);

  useEffect(() => {
    error &&
      setTimeout(() => {
        navigation("/");
      }, 3000);
  }, [error]);

  const accountUpdate = () => {
    setUpdate(!update);
  };

  return (
    <Container className="exist-account-container">
      {isLoading ? (
        <Spinner as="div" animation="border" role="status" aria-hidden="true" />
      ) : response && response.success === true ? (
        <>
          <h5 className="exist-account-title">Account info</h5>
          <div className="exist-account-form-inputs">
            <Input
              id={"account-first-name"}
              type={"text"}
              label={"Username"}
              text={"First name"}
              placeholder={response.customer.name}
              changeability={update}
            />
            <Input
              id={"account-last-name"}
              type={"text"}
              label={"Username"}
              text={"Last name"}
              placeholder={response.customer.lastname}
              changeability={update}
            />
            <Input
              id={"account-email"}
              type={"text"}
              label={"Email"}
              text={"E-mail"}
              placeholder={response.customer.email}
              changeability={update}
            />
            <Input
              id={"account-phone-num"}
              type={"tel"}
              label={"Phone number"}
              text={"Phone number"}
              placeholder={response.customer.phone}
              changeability={update}
            />
            <Input
              id={"account-bday"}
              type={"text"}
              label={"Date of Birth"}
              text={"Date of Birth"}
              placeholder={"12.07.1987"}
              changeability={update}
            />
            <Input
              id={"account-payment-method"}
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
        </>
      ) : (
        <div className="error-404">
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for could not be found.</p>
          <p>Please check the URL or go back to the homepage.</p>
        </div>
      )}
    </Container>
  );
};

export default ExistAccountInfo;

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
import { dateFormatter } from "../../util/dateFormatter";
import Form from "react-bootstrap/Form";
import iDealImg from "../../assets/ideal.png";
import PayPalImg from "../../assets/paypal.png";
import CreditCardImg from "../../assets/credit-card.png";
import { isValidEmail } from "../../util/emailValidation";
import { isValidName } from "../../util/nameValidation";
import { isValidPhoneNumber } from "../../util/phoneNumberValidation";

const ExistAccountInfo = () => {
  const [update, setUpdate] = useState(true);
  const [userData, setUserData] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [popUpProp, setPopUpProp] = useState(<></>);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [btnTitle, setBtnTitle] = useState("");
  const [response, setResponse] = useState(null);
  const [fetchUrl, setFetchUrl] = useState("/customer/auth");
  const [newDataCheck, setNewDataCheck] = useState({
    name: "none",
    email: "none",
    phone: "none",
  });

  const [paymentSelect, setPaymentSelect] = useState("none");

  const navigation = useNavigate();
  const { isLoading, error, performFetch } = useFetch(fetchUrl, (response) => {
    setResponse(response);
  });

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
    if (response && response.success === false) {
      setTimeout(() => {
        navigation("/");
      }, 3000);
    }
  }, [response]);

  const accountUpdate = () => {
    setUpdate(!update);
  };

  const updateCheck = (e, objKey) => {
    {
      if (response.customer[objKey] !== e.target.value) {
        setUserData({ ...userData, [objKey]: e.target.value });
      }
      if (response.customer[objKey] === e.target.value) {
        const obj = { ...userData };
        delete obj[objKey];
        setUserData(obj);
      }
    }
  };

  const updateUserData = () => {
    if (userData && Object.keys(userData).length >= 1) {
      performFetch({
        method: "PUT",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    }
  };

  useEffect(() => {
    if (response && userData.payment) {
      if (response.customer.payment !== userData.payment) {
        setUserData({ ...userData, payment: userData.payment });
      }
      if (response.customer.payment === userData.payment) {
        const obj = { ...userData };
        delete obj.payment;
        setUserData(obj);
      }
    }
  }, [userData.payment]);

  useEffect(() => {
    if (!update) {
      setFetchUrl("/auth/edit-user");
    } else {
      updateUserData();
    }
  }, [update]);

  return (
    <Container className="exist-account-container">
      {isLoading ? (
        <Spinner as="div" animation="border" role="status" aria-hidden="true" />
      ) : response && response.success === true ? (
        <>
          <h5 className="exist-account-title">Account info</h5>
          {error && <p>{error.toString()}</p>}
          <div className="exist-account-form-inputs">
            <Input
              id={"account-first-name"}
              type={"text"}
              label={"Username"}
              text={"First name"}
              defaultValue={response.customer.firstname}
              changeability={update}
              cb={(e) => {
                if (isValidName(e.target.value)) {
                  updateCheck(e, "firstname");
                  setNewDataCheck({ ...newDataCheck, name: "none" });
                } else {
                  setNewDataCheck({ ...newDataCheck, name: "block" });
                }
              }}
            />
            <Input
              id={"account-last-name"}
              type={"text"}
              label={"Username"}
              text={"Last name"}
              defaultValue={response.customer.lastname}
              changeability={update}
              cb={(e) => {
                if (isValidName(e.target.value)) {
                  updateCheck(e, "lastname");
                  setNewDataCheck({ ...newDataCheck, name: "none" });
                } else {
                  setNewDataCheck({ ...newDataCheck, name: "block" });
                }
              }}
            />
            <p
              style={{
                display: newDataCheck.name,
                color: "red",
                fontSize: "11px",
              }}
            >
              The name should consist of letters only, with hyphens allowed, and
              should contain a minimum of two characters.
            </p>
            <Input
              id={"account-email"}
              type={"text"}
              label={"Email"}
              text={"E-mail"}
              defaultValue={response.customer.email}
              changeability={update}
              cb={(e) => {
                if (isValidEmail(e.target.value)) {
                  updateCheck(e, "email");
                  setNewDataCheck({ ...newDataCheck, email: "none" });
                } else {
                  setNewDataCheck({ ...newDataCheck, email: "block" });
                }
              }}
            />
            <p
              style={{
                display: newDataCheck.email,
                color: "red",
                fontSize: "11px",
              }}
            >
              Check e-mail format
            </p>
            <Input
              id={"account-phone-num"}
              type={"tel"}
              label={"Phone number"}
              text={"Phone number"}
              defaultValue={response.customer.phone}
              changeability={update}
              cb={(e) => {
                if (isValidPhoneNumber(e.target.value)) {
                  updateCheck(e, "phone");
                  setNewDataCheck({ ...newDataCheck, phone: "none" });
                } else {
                  setNewDataCheck({ ...newDataCheck, phone: "block" });
                }
              }}
            />
            <p
              style={{
                display: newDataCheck.phone,
                color: "red",
                fontSize: "11px",
              }}
            >
              Enter an international phone number starting with +
            </p>
            <Input
              id={"account-bday"}
              type={"date"}
              label={"Date of Birth"}
              text={"Date of Birth"}
              defaultValue={dateFormatter(new Date(response.customer.birthday))}
              changeability={update}
              cb={(e) => {
                if (
                  dateFormatter(new Date(response.customer.birthday)) !==
                  dateFormatter(new Date(e.target.value))
                ) {
                  setUserData({
                    ...userData,
                    birthday: new Date(e.target.value),
                  });
                }
                if (
                  dateFormatter(new Date(response.customer.birthday)) ===
                  dateFormatter(new Date(e.target.value))
                ) {
                  const obj = { ...userData };
                  delete obj.birthday;
                  setUserData(obj);
                }
              }}
            />
            <Input
              id={"account-payment-method"}
              type={"text"}
              label={"Payment method"}
              text={"Payment method"}
              value={userData.payment || response.customer.payment}
              changeability={true}
            />

            <Form style={{ display: paymentSelect }}>
              <div key="inline-radio" className="mb-3 payment-method-select">
                <div className="payment-method-select-component">
                  <img src={iDealImg} alt="ideal" />
                  <Form.Check
                    inline
                    name="group1"
                    type="radio"
                    id="inline-radio-1"
                    onChange={() => {
                      setUserData({ ...userData, payment: "iDeal" });
                    }}
                  />
                </div>
                <div className="payment-method-select-component">
                  <img src={PayPalImg} alt="paypal" />
                  <Form.Check
                    inline
                    name="group1"
                    type="radio"
                    id="inline-radio-2"
                    onChange={() => {
                      setUserData({ ...userData, payment: "PayPal" });
                    }}
                  />
                </div>
                <div className="payment-method-select-component">
                  <img src={CreditCardImg} alt="credit card" />
                  <Form.Check
                    inline
                    name="group1"
                    type="radio"
                    id="inline-radio-3"
                    onChange={() => {
                      setUserData({ ...userData, payment: "Credit card" });
                    }}
                  />
                </div>
              </div>
            </Form>
          </div>
          <div className="exist-account-form-inputs">
            <div className="exist-account-btn-block">
              <Button
                variant="outline-secondary"
                onClick={() => {
                  paymentSelect === "none"
                    ? setPaymentSelect("block")
                    : setPaymentSelect("none");

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

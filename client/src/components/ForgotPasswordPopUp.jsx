import Input from "./InputComponent";
import React from "react";

const ForgotPasswordPopUp = () => {
  return (
    <div className="forgot-password-popup-body">
      <p>
        Enter your email address and you will receive an email with instructions
      </p>
      <Input
        id={"forgot-password-input"}
        type={"email"}
        label={"E-mail"}
        text={"E-mail"}
      />
    </div>
  );
};

export default ForgotPasswordPopUp;

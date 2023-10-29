import React, { useState } from "react";
import Input from "./InputComponent";

import "./CSS/DeleteAccountPopUp.css";
import ShowPasswordBtn from "./ShowPasswordBtn";

const DeleteAccountConfirmation = () => {
  const [showPassword, setShowPassword] = useState("password");

  const showPasswordSwitch = () => {
    setShowPassword("text");
    if (showPassword === "text") setShowPassword("password");
  };
  return (
    <div className="delete-account">
      <h5>
        Enter your password to delete your account.
        <br />
        All data and past bookings will be deleted.
      </h5>

      <Input
        id={"delete-account-password"}
        type={showPassword}
        label={"Password"}
        text={"Password"}
        btn={<ShowPasswordBtn cb={showPasswordSwitch} />}
      />
    </div>
  );
};

export default DeleteAccountConfirmation;

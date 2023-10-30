import React, { useState } from "react";
import Input from "./InputComponent";

import "./CSS/ChangePasswordPopUp.css";
import ShowPasswordBtn from "./ShowPasswordBtn";

const ChangePasswordInputs = () => {
  const [showPassword, setShowPassword] = useState("password");

  const showPasswordSwitch = () => {
    setShowPassword("text");
    if (showPassword === "text") setShowPassword("password");
  };

  return (
    <div className="change-password-inputs">
      <Input
        id={"change-password-current"}
        type={showPassword}
        label={"Password"}
        text={"Current password"}
      />

      <br />

      <Input
        id={"change-password-new-pass"}
        type={showPassword}
        label={"Password"}
        text={"New password"}
      />

      <Input
        id={"change-password-repeat-new-pass"}
        type={showPassword}
        label={"Password"}
        text={"Repeat new password"}
        btn={<ShowPasswordBtn cb={showPasswordSwitch} />}
      />
    </div>
  );
};

export default ChangePasswordInputs;

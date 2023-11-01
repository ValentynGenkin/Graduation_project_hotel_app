import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Input from "../../components/InputComponent";
import ShowPasswordBtn from "../../components/ShowPasswordBtn";

import "../../components/CSS/PasswordReset.css";

const PasswordReset = () => {
  const [showPassword, setShowPassword] = useState("password");

  const showPasswordSwitch = () => {
    setShowPassword("text");
    if (showPassword === "text") setShowPassword("password");
  };

  return (
    <Container className="reset-password-container">
      <div className="reset-password-block">
        <h5>Create new password</h5>
        <br />
        <div className="reset-password-inputs">
          <Input
            id={"reset-password-new-pass"}
            type={showPassword}
            label={"Password"}
            text={"New password"}
          />

          <Input
            id={"reset-password-repeat-new-pass"}
            type={showPassword}
            label={"Password"}
            text={"Repeat password"}
            btn={<ShowPasswordBtn cb={showPasswordSwitch} />}
          />
        </div>
        <br />
        <Button variant="secondary">Save</Button>
      </div>
    </Container>
  );
};

export default PasswordReset;

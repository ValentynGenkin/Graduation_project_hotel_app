import React from "react";
import Navbar from "../Component/Navbar";
import RegistrationForm from "../Component/RegistrationForm";
import UserList from "../Component/UserList";

const Clients = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />
      <div
        style={{
          width: "100vw",
          backgroundColor: "red",
          overflowX: "hidden",
          display: "flex",
        }}
      >
        <UserList />
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Clients;

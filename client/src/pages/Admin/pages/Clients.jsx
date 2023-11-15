import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import RegistrationForm from "../Component/RegistrationForm";
import UserList from "../Component/UserList";
import Footer from "../Component/Footer";

const Clients = () => {
  const [reload, setReload] = useState(false);
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />
      <div
        style={{
          width: "100vw",
          overflowX: "hidden",
          overflowY: "hidden",
          display: "flex",
          alignItems: "start",
          justifyContent: "space-around",
          marginTop: "10px",
        }}
      >
        <UserList reload={reload} />
        <RegistrationForm reload={reload} setReload={setReload} />
      </div>
      <Footer />
    </div>
  );
};

export default Clients;

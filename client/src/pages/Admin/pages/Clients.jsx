import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import RegistrationForm from "../Component/RegistrationForm";
import UserList from "../Component/UserList";
import Footer from "../Component/Footer";
import { Accordion, Button, Container } from "react-bootstrap";

const Clients = () => {
  const [reload, setReload] = useState(false);
  return (
    <>
      <Navbar />
      <Container style={{ minHeight: "calc(100vh - 204px)" }}>
        <Accordion
          className="add-admin-accordion"
          style={{ width: "400px", margin: "0 auto", paddingTop: "10px" }}
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <Button style={{ width: "100% " }} variant="secondary">
                Add new admin
              </Button>
            </Accordion.Header>
            <Accordion.Body>
              <RegistrationForm reload={reload} setReload={setReload} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <UserList reload={reload} />
      </Container>
      <Footer />
    </>
  );
};

export default Clients;

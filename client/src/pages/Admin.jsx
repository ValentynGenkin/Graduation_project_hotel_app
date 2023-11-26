import React from "react";
import Navbar from "./Admin/Component/Navbar";
import Chart from "./Admin/Component/Chart";
import Circle from "./Admin/Component/Circle";
import Footer from "./Admin/Component/Footer";
import { Container } from "react-bootstrap";
const Admin = () => {
  return (
    <div style={{ overflowX: "hidden", backgroundColor: "#f5f5f5" }}>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          minHeight: "calc(100vh - 204px)",
        }}
      >
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "30px",
          }}
        >
          <Chart />
          <Circle />
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;

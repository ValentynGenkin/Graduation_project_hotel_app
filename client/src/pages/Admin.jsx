import React from "react";
import Navbar from "./Admin/Component/Navbar";
import Chart from "./Admin/Component/Chart";
import Circle from "./Admin/Component/Circle";
import Footer from "./Admin/Component/Footer";
const Admin = () => {
  return (
    <div style={{ overflowX: "hidden", backgroundColor: "#f5f5f5" }}>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        <Chart />
        <Circle />
      </div>
      <Footer />
    </div>
  );
};

export default Admin;

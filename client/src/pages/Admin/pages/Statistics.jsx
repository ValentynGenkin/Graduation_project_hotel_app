import React from "react";
import Chart from "../Component/Chart";
import Circle from "../Component/Circle";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

const Statistics = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />
      <Chart />
      <Circle />
      <Footer />
    </div>
  );
};

export default Statistics;

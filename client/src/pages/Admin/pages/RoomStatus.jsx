import React from "react";
import RoomsTimeTable from "../Component/RoomsTimeTable";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

const Status = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />
      <RoomsTimeTable />
      <Footer />
    </div>
  );
};

export default Status;

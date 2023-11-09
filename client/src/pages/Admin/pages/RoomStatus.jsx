import React from "react";
import Requests from "../Component/Requests";
import RoomsTimeTable from "../Component/RoomsTimeTable";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

const Status = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />
      <RoomsTimeTable />
      <Requests />
      <Footer />
    </div>
  );
};

export default Status;

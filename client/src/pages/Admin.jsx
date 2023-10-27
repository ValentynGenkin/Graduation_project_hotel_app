import React from "react";
import Navbar from "./Admin/Component/Navbar";
import RoomTable from "./Admin/Component/RoomsTimeTable";
import Requests from "./Admin/Component/Requests";
import Footer from "./Admin/Component/Footer";
const Admin = () => {
  return (
    <>
      <Navbar />
      <RoomTable />
      <Requests />
      <Footer />
    </>
  );
};

export default Admin;

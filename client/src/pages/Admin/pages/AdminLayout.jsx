import { Outlet } from "react-router-dom";
import React from "react";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../../../components/Footer";
import Navbar from "../Component/Navbar";

const AdminLayout = () => {
  return (
    <>
      <Navbar />

      <Outlet />

      <ScrollToTop
        className="scroll-btn"
        smooth
        component={<img src={"assets/to-top.png"} alt="top-btn" />}
      />

      <Footer />
    </>
  );
};

export default AdminLayout;

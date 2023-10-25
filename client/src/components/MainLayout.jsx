import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import React from "react";
import ScrollToTop from "react-scroll-to-top";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      <NavigationBar />

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

export default MainLayout;

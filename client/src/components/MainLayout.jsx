import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import React from "react";
import ScrollToTop from "react-scroll-to-top";
import Footer from "./Footer";
import ToTopImage from "../assets/to-top.png";
import { BookingContextProvider } from "../contexts/BookingContext";

const MainLayout = () => {
  return (
    <>
      <BookingContextProvider>
        <NavigationBar />

        <Outlet />

        <ScrollToTop
          className="scroll-btn"
          smooth
          component={<img src={ToTopImage} alt="top-btn" />}
        />

        <Footer />
      </BookingContextProvider>
    </>
  );
};

export default MainLayout;

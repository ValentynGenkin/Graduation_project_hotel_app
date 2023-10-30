import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home/Home";
import ClientRegistrationForm from "./pages/RegistrationForm/ClientRegistrationForm";
import ExistAccountInfo from "./pages/Account/ExistAccountInfo";
import ClientBookings from "./pages/Bookings/ClientBookings";
import ClientCheckout from "./components/ClientCheckout";
import ClientCheckoutConfirmation from "./components/ClientCheckoutConfirmation";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="registration" element={<ClientRegistrationForm />} />
          <Route path="account-info" element={<ExistAccountInfo />} />
          <Route path="current-bookings" element={<ClientBookings />} />
          <Route path="checkout" element={<ClientCheckout />} />
          <Route
            path="checkout-confirmation"
            element={<ClientCheckoutConfirmation />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;

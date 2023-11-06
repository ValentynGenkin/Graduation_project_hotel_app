import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home/Home";
import Admin from "../src/pages/Admin";
import Clients from "./pages/Admin/pages/Clients";
import AddRooms from "./pages/Admin/pages/AddRooms";
import Login from "./pages/Admin/Component/Login";
import ClientRegistrationForm from "./pages/RegistrationForm/ClientRegistrationForm";
import ExistAccountInfo from "./pages/Account/ExistAccountInfo";
import ClientBookings from "./pages/Bookings/ClientBookings";
import RoomInfoCard from "../src/components/RoomInfoCard";
import ClientCheckout from "./components/ClientCheckout";
import ClientCheckoutConfirmation from "./components/ClientCheckoutConfirmation";
import RoomStatus from "./pages/Admin/pages/RoomStatus";
import PasswordReset from "./pages/PasswordReset/PasswordReset";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="registration" element={<ClientRegistrationForm />} />
          <Route path="account-info" element={<ExistAccountInfo />} />
          <Route path="current-bookings" element={<ClientBookings />} />
          <Route path="RoomInfoCard" element={<RoomInfoCard />} />

          <Route path="checkout" element={<ClientCheckout />} />
          <Route
            path="checkout-confirmation"
            element={<ClientCheckoutConfirmation />}
          />
          <Route path="reset-password" element={<PasswordReset />} />
        </Route>
        <Route path="admin" element={<Admin />} />
        <Route path="clients" element={<Clients />} />
        <Route path="AddRooms" element={<AddRooms />} />
        <Route path="Login" element={<Login />} />
        <Route path="Status" element={<RoomStatus />} />
        <Route path="Login-admin" element={<Login />} />
        <Route path="Status" element={<RoomStatus />} />
      </Routes>
    </>
  );
};

export default App;

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
import Statistics from "./pages/Admin/pages/Statistics";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="registration" element={<ClientRegistrationForm />} />
          <Route path="account-info" element={<ExistAccountInfo />} />
          <Route path="current-bookings" element={<ClientBookings />} />
        </Route>
        <Route path="admin" element={<Admin />} />
        <Route path="clients" element={<Clients />} />
        <Route path="AddRooms" element={<AddRooms />} />
        <Route path="Login" element={<Login />} />
        <Route path="/Statistics" element={<Statistics />} />
      </Routes>
    </>
  );
};

export default App;

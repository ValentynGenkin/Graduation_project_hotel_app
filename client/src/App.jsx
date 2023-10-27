import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home/Home";
import Admin from "../src/pages/Admin";
import Clients from "./pages/Admin/pages/Clients";
import AddRooms from "./pages/Admin/pages/AddRooms";
import Login from "./pages/Admin/Component/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="admin" element={<Admin />} />
        <Route path="clients" element={<Clients />} />
        <Route path="AddRooms" element={<AddRooms />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;

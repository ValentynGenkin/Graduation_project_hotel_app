import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home/Home";
import ClientRegistrationForm from "./components/ClientRegistrationForm";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="registration" element={<ClientRegistrationForm />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

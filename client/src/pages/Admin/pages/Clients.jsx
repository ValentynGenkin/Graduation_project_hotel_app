import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar";

const Clients = () => {
  return (
    <>
      <Navbar />
      <h2>clients</h2>
      <Link to="/Admin">
        <button>Back</button>
      </Link>
    </>
  );
};

export default Clients;

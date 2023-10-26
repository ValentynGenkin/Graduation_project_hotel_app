import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Navbar.css";
import AdminIcon from "../Icons/profile.png";
import RoomsIcon from "../Icons/AddRooms.png"; // Replace with the path to your Rooms icon PNG
import ClientsIcon from "../Icons/clients.png"; // Replace with the path to your Clients icon PNG

const Navbar = () => {
  return (
    <div className="nav-wrapper">
      <div className="nav-center">
        <Link to="/Admin" className="nav-link">
          <div className="logo">
            <img src={AdminIcon} alt="Admin Icon" className="icon" />
            Admin
          </div>
        </Link>
        <div className="nav-links">
          <Link to="/AddRooms" className="nav-link">
            <img src={RoomsIcon} alt="Rooms Icon" className="icon" />
            Add Rooms
          </Link>
          <Link to="/Clients" className="nav-link">
            <img src={ClientsIcon} alt="Clients Icon" className="icon" />
            Clients
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

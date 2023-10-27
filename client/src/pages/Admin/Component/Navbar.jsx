import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Navbar.css";
import AdminIcon from "../Icons/profile.png";
import RoomsIcon from "../Icons/AddRooms.png";
import ClientsIcon from "../Icons/clients.png";
import StatisticsIcon from "../Icons/Statestic.png"; // Import Statistics icon PNG
import ReviewsIcon from "../Icons/Reviews.png"; // Import Reviews icon PNG
import LogoutIcon from "../Icons/Logout.png";

const Navbar = () => {
  return (
    <div className="nav-wrapper">
      <div className="nav-center">
        <Link to="/Admin" className="nav-link">
          <div className="logo">
            <img src={AdminIcon} alt="Admin Icon" className="icon" />
            chouaib
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
          {/* Add Statistics Link */}
          <Link to="/Statistics" className="nav-link">
            <img src={StatisticsIcon} alt="Statistics Icon" className="icon" />
            Statistics
          </Link>
          <Link to="/Reviews" className="nav-link">
            <img src={ReviewsIcon} alt="Reviews Icon" className="icon" />
            Reviews
          </Link>

          <Link to="/Login" className="nav-link">
            <img src={LogoutIcon} alt="Logout Icon" className="icon" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Navbar.css";
import Manager from "../Icons/Manager.png";
import { FcStatistics } from "react-icons/fc"; // Import FcStatistics from react-icons/fc
import { LuLogOut } from "react-icons/lu"; // Import LuLogOut from react-icons/lu
import { MdReviews } from "react-icons/md"; // Import MdReviews from react-icons/md
import { HiOutlineUsers } from "react-icons/hi"; // Import HiOutlineUsers from react-icons/hi
import { MdOutlineBedroomParent } from "react-icons/md"; // Import MdOutlineBedroomParent from react-icons/md

const Navbar = () => {
  return (
    <div className="nav-wrapper">
      <div className="nav-center">
        <Link to="/Admin" className="nav-link">
          <div className="Admin-name">
            <img src={Manager} alt="admin logo" className="Nav-image" />
            Chouaib Atrous
          </div>
        </Link>
        <div className="nav-links">
          <Link to="/AddRooms" className="nav-link">
            <MdOutlineBedroomParent className="Nav-icon" />
            Add Rooms
          </Link>
          <Link to="/Clients" className="nav-link">
            <HiOutlineUsers className="Nav-icon" />
            Clients
          </Link>

          <Link to="/Status" className="nav-link">
            <FcStatistics className="Nav-icon" />
            Room Status
          </Link>
          <Link to="/Reviews" className="nav-link">
            <MdReviews className="Nav-icon" />
            Reviews
          </Link>

          <Link to="/Login" className="nav-link">
            <LuLogOut className="Nav-icon" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

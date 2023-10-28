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
          <div className="logo">
            <img
              src={Manager}
              alt="Description of the image"
              className="image"
            />
            Chouaib Atrous
          </div>
        </Link>
        <div className="nav-links">
          <Link to="/AddRooms" className="nav-link">
            <MdOutlineBedroomParent className="icon" />{" "}
            {/* Use MdOutlineBedroomParent icon */}
            Add Rooms
          </Link>
          <Link to="/Clients" className="nav-link">
            <HiOutlineUsers className="icon" /> {/* Use HiOutlineUsers icon */}
            Clients
          </Link>
          {/* Add Statistics Link */}
          <Link to="/Statistics" className="nav-link">
            <FcStatistics className="icon" /> {/* Use FcStatistics icon */}
            Statistics
          </Link>
          <Link to="/Reviews" className="nav-link">
            <MdReviews className="icon" /> {/* Use MdReviews icon */}
            Reviews
          </Link>

          <Link to="/Login" className="nav-link">
            <LuLogOut className="icon" /> {/* Use LuLogOut icon */}
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

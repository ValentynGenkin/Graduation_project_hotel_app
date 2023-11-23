import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";
import Manager from "../Icons/Manager.png";
import { TbBrandBooking } from "react-icons/tb";
import { FcStatistics } from "react-icons/fc"; // Import FcStatistics from react-icons/fc
import { LuLogOut } from "react-icons/lu"; // Import LuLogOut from react-icons/lu
import { MdReviews } from "react-icons/md"; // Import MdReviews from react-icons/md
import { HiOutlineUsers } from "react-icons/hi"; // Import HiOutlineUsers from react-icons/hi
import { MdOutlineBedroomParent } from "react-icons/md"; // Import MdOutlineBedroomParent from react-icons/md
import useFetch from "../../../hooks/useFetch";
import { Container } from "react-bootstrap";

const Navbar = () => {
  const [userData, setUserData] = useState({ firstname: "", lastname: "" });
  useEffect(() => {
    const userData = localStorage.getItem("admin");
    const parsed = JSON.parse(userData);
    setUserData(parsed);
  }, []);
  const navigate = useNavigate();
  const authFetch = useFetch("/admin/dashboard", () => {});
  useEffect(() => {
    authFetch.performFetch({ credentials: "include" });
    if (authFetch.error) {
      navigate("/Admin/login");
    } else {
      return () => authFetch.cancelFetch();
    }

    return () => authFetch.cancelFetch();
  }, [authFetch.error]);
  const { performFetch } = useFetch("/admin/logout", () => {
    navigate("/Admin/login");
    localStorage.clear("admin");
  });
  const handleLogout = () => {
    performFetch({ credentials: "include" });
  };
  return (
    <div className="navbar-wrapper">
      <Container>
        <div className="navbar-center">
          <Link to="/Admin" className="nav-link">
            <div className="Admin-name">
              <img src={Manager} alt="admin logo" className="Nav-image" />
              {userData?.firstname} {userData?.lastname}
            </div>
          </Link>
          <div className="nav-All-links">
            <Link to="/Admin/CustomerBooking" className="nav-link-admin">
              <TbBrandBooking className="Nav-icon" />
              Manual booking
            </Link>
            <Link to="/Admin/AddRooms" className="nav-link-admin">
              <MdOutlineBedroomParent className="Nav-icon" />
              Add Rooms
            </Link>
            <Link to="/Admin/Clients" className="nav-link-admin">
              <HiOutlineUsers className="Nav-icon" />
              Clients
            </Link>

            <Link to="/Admin/Status" className="nav-link-admin">
              <FcStatistics className="Nav-icon" />
              Room Status
            </Link>
            <Link to="/Admin/Reviews" className="nav-link-admin">
              <MdReviews className="Nav-icon" />
              Reviews
            </Link>

            <p onClick={handleLogout} className="nav-link-admin">
              <LuLogOut className="Nav-icon" />
              Logout
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

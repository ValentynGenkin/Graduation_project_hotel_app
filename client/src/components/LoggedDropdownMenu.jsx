import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import { Link } from "react-router-dom";

import "./CSS/LoginDropdownMenu.css";

const LoggedDropdownMenu = () => {
  return (
    <NavDropdown
      className="logged-dropdown-menu"
      title="User Name"
      id="basic-nav-dropdown"
      align={{ sm: "end" }}
    >
      <NavDropdown.Item as={Link} to={"/"}>
        Account
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to={"/"}>
        Bookings
      </NavDropdown.Item>

      <NavDropdown.Item as={Link} to={"/"}>
        Log out
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default LoggedDropdownMenu;

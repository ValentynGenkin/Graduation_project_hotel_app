import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./CSS/LoginDropdownMenu.css";
import useFetch from "../hooks/useFetch";
import PropTypes from "prop-types";

const LoggedDropdownMenu = ({ name }) => {
  const navigation = useNavigate();
  const [response, setResponse] = useState(null);
  const { performFetch, cancelFetch } = useFetch("/auth/logout", (response) => {
    setResponse(response);
  });
  const userLogOut = () => {
    performFetch();
    return cancelFetch;
  };

  useEffect(() => {
    if (response && response.success === true) {
      navigation("/");
    }
  }, [response]);

  return (
    <NavDropdown
      className="logged-dropdown-menu"
      title={name}
      id="basic-nav-dropdown"
      align={{ sm: "end" }}
    >
      <NavDropdown.Item as={Link} to={"/account-info"}>
        Account
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to={"/current-bookings"}>
        Bookings
      </NavDropdown.Item>

      <NavDropdown.Item
        onClick={() => {
          userLogOut();
        }}
      >
        Log out
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default LoggedDropdownMenu;

LoggedDropdownMenu.propTypes = {
  name: PropTypes.string.isRequired,
};

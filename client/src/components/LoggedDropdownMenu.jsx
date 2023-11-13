import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./CSS/LoginDropdownMenu.css";
import useFetch from "../hooks/useFetch";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";

const LoggedDropdownMenu = ({ name }) => {
  const navigation = useNavigate();
  const [response, setResponse] = useState(null);

  const { isLoading, error, performFetch } = useFetch(
    "/auth/logout",
    (response) => {
      setResponse(response);
      localStorage.removeItem("booking");
    }
  );
  const userLogOut = () => {
    performFetch({
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
  };

  useEffect(() => {
    if (response && response.success === true) {
      navigation("/");
      location.reload();
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
        {isLoading ? (
          <Spinner
            as="div"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          "Log out"
        )}
        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: "10px",
              padding: "0",
              fontSize: "11px",
            }}
          >
            {error.toString()}
          </p>
        )}
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default LoggedDropdownMenu;

LoggedDropdownMenu.propTypes = {
  name: PropTypes.string.isRequired,
};

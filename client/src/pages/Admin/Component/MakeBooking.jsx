import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch.js";
import { AdminBookingContext } from "../../../contexts/AdminBookingContext";
import PropTypes from "prop-types";
import "../CSS/Booking.css";

function MakeBooking({ roomId, checkIn, checkOut, className }) {
  MakeBooking.propTypes = {
    roomId: PropTypes.string.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
  };

  const { handleBookingContext } = useContext(AdminBookingContext);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
  });

  const [clickEvent, setClickEvent] = useState();
  const [inputError, setInputError] = useState(false);
  const [addError, setAddError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/booking/in-branch",

    (response) => {
      if (response.success === true) {
        localStorage.setItem("booking", JSON.stringify(response.booking));
        handleBookingContext();
        setSuccess(true);
      }
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.phone ||
      !formData.email
    ) {
      setInputError(true);
      return;
    }
    performFetch({
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        roomId: roomId,
        checkIn: checkIn,
        checkOut: checkOut,
      }),
    });
  };
  useEffect(() => {
    if (clickEvent) {
      handleSubmit();
    }
    return () => {
      cancelFetch();
    };
  }, [clickEvent]);

  useEffect(() => {
    if (error) {
      setAddError(true);
    }

    if (addError) {
      let timeout = setTimeout(() => {
        setAddError(false);
      }, 100000);
      return () => clearTimeout(timeout);
    }
  }, [error, addError]);

  return (
    <div>
      <>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <>
            <p>Something went wrong. Error: {error.toString()}</p>
            <button
              className={className}
              onClick={() => setClickEvent(new Date())}
            >
              Make Booking
            </button>
          </>
        ) : (
          <>
            <form className="admin-booking-form-04" onSubmit={handleSubmit}>
              <div className="admin-form-group-div-04">
                <input
                  className="admin-form-input-04"
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="First Name"
                />
                <input
                  className="admin-form-input-04"
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
                <input
                  className="admin-form-input-04"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />

                <input
                  className="admin-form-input-04"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="admin-booking-button-04"
                  onClick={() => setClickEvent(new Date())}
                >
                  {isLoading ? "Booking..." : "Make Booking"}
                </button>
                {inputError && <p className="p-05">All fields are required!</p>}
                {success && <p className="p-05">Booking went successfully!</p>}
                {addError && <p className="p-05">Failed to make booking!</p>}
              </div>
            </form>
          </>
        )}
      </>
    </div>
  );
}

export default MakeBooking;

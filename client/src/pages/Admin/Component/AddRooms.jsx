import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import "../CSS/AddRooms.css";

const AddRoomForm = () => {
  const [roomDetails, setRoomDetails] = useState({
    roomNo: "",
    roomDescription: "",
    roomType: "",
    bedCount: "",
    roomPrice: "",
    facilities: [],
    images: [],
  });

  const [inputError, setInputError] = useState(false);
  const [inputErrorMsg, setInputErrorMsg] = useState();
  const [addError, setAddError] = useState(false);

  const [success, setSuccess] = useState(false);

  const { performFetch } = useFetch("/rooms/add", () => {
    setSuccess(true);
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setRoomDetails((prevRoomDetails) => ({
      ...prevRoomDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      roomNo,
      roomDescription,
      roomType,
      bedCount,
      roomPrice,
      facilities,
      images,
    } = roomDetails;

    if (
      !roomNo ||
      !roomDescription ||
      !roomType ||
      !bedCount ||
      !roomPrice ||
      !facilities.length ||
      !images.length
    ) {
      setInputError(true);
      setInputErrorMsg("Please fill in all fields");
    } else {
      AddRoom(roomDetails);
    }
  };

  const AddRoom = (data) => {
    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    if (success || addError || inputError) {
      const timeout = setTimeout(() => {
        setSuccess(false);
        setInputError(false);
        setAddError(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [success, addError, inputError]);

  return (
    <form onSubmit={handleSubmit} className="room-registrationForm">
      <label className="room-form-group">
        Room Number:
        <input
          type="text"
          name="roomNo"
          value={roomDetails.roomNo}
          onChange={handleInputChange}
          className="room-input"
        />
      </label>
      <label className="room-form-group">
        Room Description:
        <input
          type="text"
          name="roomDescription"
          value={roomDetails.roomDescription}
          onChange={handleInputChange}
          className="room-input"
        />
      </label>
      <label className="room-form-group">
        Room Type:
        <input
          type="text"
          name="roomType"
          value={roomDetails.roomType}
          onChange={handleInputChange}
          className="room-input"
        />
      </label>
      <label className="room-form-group">
        Bed Count:
        <input
          type="number"
          name="bedCount"
          value={roomDetails.bedCount}
          onChange={handleInputChange}
          className="room-input"
        />
      </label>
      <label className="room-form-group">
        Room Price:
        <input
          type="number"
          name="roomPrice"
          value={roomDetails.roomPrice}
          onChange={handleInputChange}
          className="room-input"
        />
      </label>
      <label className="room-form-group">
        Facilities:
        <input
          type="text"
          name="facilities"
          value={roomDetails.facilities}
          onChange={handleInputChange}
          className="room-input"
        />
      </label>
      <label className="room-form-group">
        Images:
        <input
          type="text"
          name="images"
          value={roomDetails.images}
          onChange={handleInputChange}
          className="room-input"
        />
      </label>
      <button type="submit" className="room-register-button">
        Add Room
      </button>
      {inputError && <p>{inputErrorMsg}</p>}
      {success && <p>New Room Added</p>}
      {addError && <p>Failed to add Room</p>}
    </form>
  );
};

export default AddRoomForm;

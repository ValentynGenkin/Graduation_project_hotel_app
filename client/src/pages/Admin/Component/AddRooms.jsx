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
  const handleImageInputChange = (event) => {
    const { name, files } = event.target;

    setRoomDetails((prevRoomDetails) => ({
      ...prevRoomDetails,
      [name]: files, // Use 'files' directly for multiple images
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
    } = roomDetails;

    if (
      !roomNo ||
      !roomDescription ||
      !roomType ||
      !bedCount ||
      !roomPrice ||
      !facilities.length
    ) {
      setInputError(true);
      setInputErrorMsg("Please fill in all fields");
    } else {
      AddRoom(roomDetails);
    }
  };

  const AddRoom = (data) => {
    // da
    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: data,
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
      <div className="input-wrapper">
        <label className="inputLabel">Room Number:</label>
        <input
          type="text"
          name="roomNo"
          value={roomDetails.roomNo}
          onChange={handleInputChange}
          className="room-input"
        />
      </div>
      <div className="input-wrapper">
        <label className="inputLabel">Room Description:</label>
        <input
          type="text"
          name="roomDescription"
          value={roomDetails.roomDescription}
          onChange={handleInputChange}
          className="room-input"
        />
      </div>
      <div className="input-wrapper">
        <label className="inputLabel">Room Type:</label>
        <input
          type="text"
          name="roomType"
          value={roomDetails.roomType}
          onChange={handleInputChange}
          className="room-input"
        />
      </div>
      <div className="input-wrapper">
        <label className="inputLabel">Bed Count:</label>
        <input
          type="number"
          name="bedCount"
          value={roomDetails.bedCount}
          onChange={handleInputChange}
          className="room-input"
        />
      </div>
      <div className="input-wrapper">
        <label className="inputLabel">Room Price:</label>
        <input
          type="number"
          name="roomPrice"
          value={roomDetails.roomPrice}
          onChange={handleInputChange}
          className="room-input"
        />
      </div>
      <div className="input-wrapper">
        <label className="inputLabel">Facilities:</label>
        <input
          type="text"
          name="facilities"
          value={roomDetails.facilities}
          onChange={handleInputChange}
          className="room-input"
        />
      </div>
      <div className="input-wrapper">
        <label className="inputLabel">Images:</label>
        <input
          type="file"
          name="images"
          onChange={(e) => handleImageInputChange(e)}
          className="room-input"
          multiple={true}
        />
      </div>
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

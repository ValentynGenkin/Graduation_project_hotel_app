import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import PropTypes from "prop-types";
import "../CSS/AddRooms.css";

const EditRoom = ({ roomData }) => {
  const [roomDetails, setRoomDetails] = useState(roomData);

  const [inputError, setInputError] = useState(false);
  const [inputErrorMsg, setInputErrorMsg] = useState("");
  const [addError, setAddError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { performFetch } = useFetch(`/rooms/${roomData?._id}/edit`, () => {
    setSuccess(true);
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setRoomDetails((prevRoomDetails) => ({
      ...prevRoomDetails,
      [name]: value,
    }));
  };
  const handleImageInputChange = (e) => {
    const files = e.target.files;
    // Do something with the selected image files
    // For example, you can store them in the component state
    setRoomDetails((prevRoomDetails) => ({
      ...prevRoomDetails,
      images: files,
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
      !facilities ||
      !images
    ) {
      setInputError(true);
      setInputErrorMsg("Please fill in all fields");
    } else {
      editRoom();
    }
  };

  const editRoom = () => {
    performFetch({
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "PUT",
      body: JSON.stringify(roomDetails),
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
        Save
      </button>
      {inputError && <p>{inputErrorMsg}</p>}
      {success && <p>changed is success</p>}
      {addError && <p>Failed to change Room details</p>}
    </form>
  );
};

export default EditRoom;
EditRoom.propTypes = {
  roomData: PropTypes.object,
  setShowEditingModal: PropTypes.func,
};

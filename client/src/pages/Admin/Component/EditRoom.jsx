import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import PropTypes from "prop-types";
import "../CSS/AddRooms.css";

const EditRoom = ({ roomData, setShowEditingModal }) => {
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

  const closeModal = () => {
    setShowEditingModal(false);
  };
  return (
    <form onSubmit={handleSubmit} className="room-registrationForm">
      <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <p onClick={closeModal} style={{ margin: "5px" }}>
          X
        </p>
      </div>
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
        Edit room
      </button>
      {inputError && <p>{inputErrorMsg}</p>}
      {success && <p>Edit is success</p>}
      {addError && <p>Failed to Edit Room</p>}
    </form>
  );
};

export default EditRoom;
EditRoom.propTypes = {
  roomData: PropTypes.object,
  setShowEditingModal: PropTypes.func,
};

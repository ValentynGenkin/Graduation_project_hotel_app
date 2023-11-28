import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import "../CSS/AddRooms.css";

const AddRoomForm = () => {
  const [roomDetails, setRoomDetails] = useState({
    roomNo: "",
    roomDescription: "",
    roomType: "",
    bedCount: "",
    roomPrice: "",
    facilities: "",
  });

  const [roomImages, setRoomImages] = useState([]);
  const [feedback, setFeedback] = useState({ error: false, message: "" });

  const { performFetch } = useFetch("/rooms/add", () => {
    setFeedback({ error: false, message: "Room added successfully!" });
    resetForm();
  });

  const resetForm = () => {
    setRoomDetails({
      roomNo: "",
      roomDescription: "",
      roomType: "",
      bedCount: "",
      roomPrice: "",
      facilities: "",
    });
    setRoomImages([]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoomDetails({ ...roomDetails, [name]: value });
  };

  const handleImageInputChange = (event) => {
    setRoomImages([...event.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Object.values(roomDetails).some((val) => val === "") ||
      roomImages.length === 0
    ) {
      setFeedback({
        error: true,
        message: "Please fill in all fields and add at least one image.",
      });
      return;
    }

    const formData = new FormData();
    Object.entries(roomDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });
    roomImages.forEach((file) => {
      formData.append("roomImages", file);
    });

    performFetch({
      method: "POST",
      credentials: "include",

      body: formData,
      headers: {},
    });
  };

  return (
    <div className="add-room-form-container">
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
          <textarea
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
            name="roomImages"
            onChange={handleImageInputChange}
            className="room-input"
            multiple
          />
        </div>
        <button type="submit" className="room-register-button">
          Add Room
        </button>
        {feedback.message && (
          <p style={{ color: feedback.error ? "red" : "green" }}>
            {feedback.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddRoomForm;

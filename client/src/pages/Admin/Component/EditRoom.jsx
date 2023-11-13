import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import PropTypes from "prop-types";
import "../CSS/EditRooms.css";

const EditRoom = ({ roomData, setShowEditingModal }) => {
  // State for room details
  const [roomDetails, setRoomDetails] = useState(roomData);

  // State for input validation and feedback
  const [inputError, setInputError] = useState(false);
  const [inputErrorMsg, setInputErrorMsg] = useState("");
  const [addError, setAddError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Custom hook for handling API requests
  const { performFetch } = useFetch(`/rooms/${roomData?._id}/edit`, () => {
    setSuccess(true);
  });

  // Handle input changes for text inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoomDetails((prevRoomDetails) => ({
      ...prevRoomDetails,
      [name]: value,
    }));
  };

  // Handle input changes for file input (images)
  const handleImageInputChange = (event) => {
    const { name, files } = event.target;
    setRoomDetails((prevRoomDetails) => ({
      ...prevRoomDetails,
      [name]: files,
    }));
  };

  // Handle form submission
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

    // Validate input fields
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
      // If validation passes, submit the form
      editRoom();
    }
  };

  // Send API request to edit room
  const editRoom = () => {
    performFetch({
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(roomDetails),
    });
  };

  // Handle feedback messages
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

  // Close the modal
  const closeModal = () => {
    setShowEditingModal(false);
  };

  return (
    <form onSubmit={handleSubmit} className="editroom-registrationForm">
      <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <p onClick={closeModal} style={{ margin: "5px" }}>
          X
        </p>
      </div>

      {/* Room Number Input */}
      <label className="editroom-form-group">
        Room Number:
        <input
          type="text"
          name="roomNo"
          value={roomDetails.roomNo}
          onChange={handleInputChange}
          className="editroom-input"
        />
      </label>

      {/* Room Description Input */}
      <label className="editroom-form-group">
        Room Description:
        <input
          type="text"
          name="roomDescription"
          value={roomDetails.roomDescription}
          onChange={handleInputChange}
          className="editroom-input"
        />
      </label>

      {/* Room Type Input */}
      <label className="editroom-form-group">
        Room Type:
        <input
          type="text"
          name="roomType"
          value={roomDetails.roomType}
          onChange={handleInputChange}
          className="editroom-input"
        />
      </label>

      {/* Bed Count Input */}
      <label className="editroom-form-group">
        Bed Count:
        <input
          type="number"
          name="bedCount"
          value={roomDetails.bedCount}
          onChange={handleInputChange}
          className="editroom-input"
        />
      </label>

      {/* Room Price Input */}
      <label className="editroom-form-group">
        Room Price:
        <input
          type="number"
          name="roomPrice"
          value={roomDetails.roomPrice}
          onChange={handleInputChange}
          className="editroom-input"
        />
      </label>

      {/* Facilities Input */}
      <label className="editroom-form-group">
        Facilities:
        <input
          type="text"
          name="facilities"
          value={roomDetails.facilities}
          onChange={handleInputChange}
          className="editroom-input"
        />
      </label>

      {/* Images Input */}
      <label className="editroom-form-group">
        Images:
        <input
          type="file"
          name="images"
          onChange={(e) => handleImageInputChange(e)}
          className="editroom-input"
          multiple={true}
        />
      </label>

      {/* Submit Button */}
      <button type="submit" className="editroom-register-button">
        Save
      </button>

      {/* Feedback Messages */}
      {inputError && <p>{inputErrorMsg}</p>}
      {success && <p>Edit is successful</p>}
      {addError && <p>Failed to Edit Room</p>}
    </form>
  );
};

EditRoom.propTypes = {
  roomData: PropTypes.object,
  setShowEditingModal: PropTypes.func,
};

export default EditRoom;

import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar";
const AddRooms = () => {
  return (
    <div>
      <Navbar />
      <h2>Rooms</h2>
      <Link to="/Admin/Rooms/AddRooms">
        <button>Add Rooms</button>
      </Link>
      <Link to="/Admin">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default AddRooms;
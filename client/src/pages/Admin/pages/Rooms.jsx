import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import RoomsList from "../Component/RoomsList";
import AddRooms from "../Component/AddRooms";
import EditRoom from "../Component/EditRoom";

const Rooms = () => {
  const [showEditingModal, setShowEditingModal] = useState(false);
  const [editingRoomData, setEditingRoomId] = useState("");
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />
      <div
        style={{
          width: "100vw",
          overflowX: "hidden",
          overflowY: "hidden",
          display: "flex",
          alignItems: "start",
          justifyContent: "space-around",
        }}
      >
        <RoomsList
          setShowEditingModal={setShowEditingModal}
          setEditingRoomId={setEditingRoomId}
        />
        <AddRooms />
        {showEditingModal && (
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "50",
            }}
          >
            <div
              style={{
                width: "500px",
                height: "600px",
                border: "gray solid 2px",
                backgroundColor: "white",
              }}
            >
              <EditRoom
                roomData={editingRoomData}
                setShowEditingModal={setShowEditingModal}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;

import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import RoomsList from "../Component/RoomsList";
import AddRooms from "../Component/AddRooms";
import EditRoom from "../Component/EditRoom";
import Footer from "../Component/Footer";

const Rooms = () => {
  const [showEditingModal, setShowEditingModal] = useState(false);
  const [editingRoomData, setEditingRoomId] = useState("");
  return (
    <div style={{ overflowX: "hidden", backgroundColor: "#f5f5f5" }}>
      <Navbar />
      <div
        style={{
          width: "100vw",
          overflowX: "hidden",
          overflowY: "hidden",
          display: "flex",
          alignItems: "start",
          justifyContent: "space-around",
          position: "relative",
          minHeight: "calc(100vh - 204px)",
        }}
      >
        <RoomsList
          setShowEditingModal={setShowEditingModal}
          setEditingRoomId={setEditingRoomId}
        />
        <AddRooms />
        {showEditingModal && (
          <>
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
                zIndex: "40",
                backgroundColor: "black",
                opacity: "0.5",
              }}
              onClick={() => setShowEditingModal(false)}
            ></div>
            <div
              style={{
                position: "absolute",
                top: "",
                left: "+50%",
                translate: "-50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "50",
              }}
            >
              <EditRoom
                roomData={editingRoomData}
                setShowEditingModal={setShowEditingModal}
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Rooms;

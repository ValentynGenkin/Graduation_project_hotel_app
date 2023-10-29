import React from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "../CSS/Circle.css";

const HotelRoomCircle = () => {
  const occupiedPercentage = 70; // For example, 70% occupied rooms

  return (
    <div className="container">
      <div className="circle-container">
        <CircularProgressbarWithChildren
          value={occupiedPercentage}
          styles={{
            path: { stroke: "red" }, // Red path for occupied
            trail: { stroke: "#fff" }, // White trail for unoccupied
          }}
          strokeWidth={10}
        >
          <div className="text-inside">{occupiedPercentage}% Occupied</div>
        </CircularProgressbarWithChildren>
        <div className="legend-container">
          <div className="legend">
            <div className="legend-box red"></div>
            <span>Occupied</span>
          </div>
          <div className="legend">
            <div className="legend-box white"></div>
            <span>Unoccupied</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelRoomCircle;

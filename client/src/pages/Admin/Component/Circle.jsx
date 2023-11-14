import React from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "../CSS/Circle.css";

const HotelRoomCircle = () => {
  const occupiedPercentage = 70;

  return (
    <div className="container-global">
      <div className="circle-container">
        <CircularProgressbarWithChildren
          value={occupiedPercentage}
          styles={{
            path: { stroke: "red" },
            trail: { stroke: "rgb(222, 184, 184)" },
          }}
          strokeWidth={10}
        >
          <div className="text-inside">{occupiedPercentage}% Occupied</div>
        </CircularProgressbarWithChildren>
        <div className="legend-container">
          <div className="legend-circle">
            <div className="legend-box red"></div>
            <span className="red-text">Occupied Room</span>
          </div>
          <div className="legend-circle">
            <div className="legend-box white"></div>
            <span className="white-text">Unoccupied Room</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelRoomCircle;

import React, { useState, useEffect } from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "../CSS/Circle.css";
import useFetch from "../../../hooks/useFetch";

const HotelRoomCircle = () => {
  const [occupiedPercentage, setOccupiedPercentage] = useState(null);
  const { performFetch } = useFetch("/admin/occupation-rate", async (res) => {
    setOccupiedPercentage(res.occupation * 100);
  });
  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }, []);

  if (occupiedPercentage === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-global">
      <div className="circle-container">
        <CircularProgressbarWithChildren
          value={occupiedPercentage}
          styles={{
            path: { stroke: "red" },
            trail: { stroke: "white" },
          }}
          strokeWidth={10}
        >
          <div className="text-inside">{`${occupiedPercentage.toFixed(
            2
          )}% Of rooms are occupied`}</div>
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

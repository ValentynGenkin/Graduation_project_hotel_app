import React from "react";
import RoomInfoCard from "../components/RoomInfoCard";

function YourParentComponent() {
  const searchCriteria = {
    checkInDate: "yyyy-mm-dd",
    checkOutDate: "yyyy-mm-dd",
    adult: 2,
    child: 0,
    room: 1,
  };

  return <RoomInfoCard searchCriteria={searchCriteria} />;
}

export default YourParentComponent;

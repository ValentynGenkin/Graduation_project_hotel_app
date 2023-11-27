import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import "./CSS/roomDetailsCard.css";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

function RoomDetailsCard({ roomId }) {
  const [sliderData, setSliderData] = useState([]);
  const [response, setResponse] = useState(null);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/rooms/${roomId}`,
    (response) => {
      setResponse(response);
      setSliderData(response?.room?.images || []);
    }
  );

  useEffect(() => {
    performFetch(
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      },
      [roomId]
    );

    return () => cancelFetch();
  }, []);

  const handleClick = (index) => {
    setSliderData([response.room.images[index]]);
  };

  return (
    <Container>
      {isLoading ? (
        <p className="loading-p-01">Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : response && response.room ? (
        <div key={response.room._id} className="room-container-01">
          <div className="imgs-01">
            <img
              src={sliderData[0]}
              className="hotel-imgs-01"
              alt={response.room.roomType}
            />
            <div className="flex-column-01">
              {response.room.images?.map((image, i) => (
                <img
                  className={sliderData[0] === image ? "clicked" : ""}
                  src={image}
                  onClick={() => handleClick(i)}
                  height="80"
                  width="160"
                  key={i}
                  alt={`Room ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className="desc-01">Description</h3>
            <div className="room-info-01">
              <ul className="room-info-ul-01">
                <li>{response.room.roomDescription}</li>
                <li>Room Type: {response.room.roomType}</li>
                <li>Bed Count: {response.room.bedCount}</li>
                <li>Room Number:{response.room.roomNo}</li>
                <li>Price: {response.room.roomPrice.$numberDecimal}$</li>
                <li>Facilities:</li>
                <ul className="u-list-02">
                  {response.room.facilities.map((facility, idx) => (
                    <li key={facility + idx}>{facility}</li>
                  ))}
                </ul>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>No data to display</p>
      )}
    </Container>
  );
}

export default RoomDetailsCard;

RoomDetailsCard.propTypes = {
  data: PropTypes.array,
  roomId: PropTypes.string.isRequired,
};

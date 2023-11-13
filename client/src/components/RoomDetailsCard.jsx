import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import "./CSS/roomDetailsCard.css";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import AddRoomToBookingButton from "../components/AddRoomToBookingButton";

function RoomDetailsCard({ roomId, checkIn, checkOut }) {
  RoomDetailsCard.propTypes = {
    data: PropTypes.array.isRequired,
    roomId: PropTypes.string.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
  };

  const [sliderData, setSliderData] = useState([]);
  const [extraBed, setExtraBed] = useState("");
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
          <div className="right-bar-01">
            <div>
              <div className="bed-option-01">
                <h4 className="bed-option-01-h4">Extra bed</h4>
                <label>
                  <input
                    type="checkbox"
                    name="ExtraBedYes"
                    checked={extraBed === "Yes"}
                    onChange={() => setExtraBed("Yes")}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="ExtraBedNo"
                    checked={extraBed === "No"}
                    onChange={() => setExtraBed("No")}
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="book-buttons-01">
            <AddRoomToBookingButton
              roomId={roomId}
              checkIn={checkIn}
              checkOut={checkOut}
              className="button-02"
            />
          </div>
        </div>
      ) : (
        <p>No data to display</p>
      )}
    </Container>
  );
}

export default RoomDetailsCard;

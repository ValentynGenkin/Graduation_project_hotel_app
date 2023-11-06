import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch.js";
import "./CSS/roomInfoCard.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { Container } from "react-bootstrap";
import RoomDetailsCard from "../components/RoomDetailsCard";
import "chart.js/auto";
import { useLocation } from "react-router-dom";

function RoomInfoCard() {
  const [response, setResponse] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [roomIdx, setRoomIdx] = useState(0);
  const queryParams = new URLSearchParams(useLocation().search);
  let checkIn = queryParams.get("checkIn");
  let checkOut = queryParams.get("checkOut");
  checkIn = new Date(checkIn).toISOString();
  checkOut = new Date(checkOut).toISOString();
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/rooms?checkIn=${checkIn}&checkOut=${checkOut}`,
    (response) => {
      setResponse(response);
    }
  );

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    return () => cancelFetch();
  }, []);

  const nextSlide = (imageLength) => {
    setRoomIdx((roomIdx + 1) % (imageLength || 0));
  };

  const prevSlide = (imageLength) => {
    setRoomIdx((roomIdx - 1 + (imageLength || 1)) % (imageLength || 0));
  };

  return (
    <Container>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : response && response.rooms && response.rooms.length > 0 ? (
        response.rooms.map((room) => (
          <div key={room._id} className="block-02">
            <div className="carousel-02">
              <BsArrowLeftCircleFill
                className="arrow-02 arrow-left-02"
                onClick={() =>
                  prevSlide(
                    room.exampleRoom && room.exampleRoom.images
                      ? room.exampleRoom.images.length
                      : 0
                  )
                }
              />
              <div>
                {room.exampleRoom && room.exampleRoom.images
                  ? room.exampleRoom.images.map((image, room) => (
                      <img
                        key={
                          room._id + room.exampleRoom && room.exampleRoom.images
                            ? room.exampleRoom.images.indexOf(image)
                            : 0
                        }
                        src={image}
                        alt={room.roomType}
                      />
                    ))
                  : []}
              </div>
              <BsArrowRightCircleFill
                className="arrow-02 arrow-right-02"
                onClick={() =>
                  nextSlide(
                    room.exampleRoom && room.exampleRoom.images
                      ? room.exampleRoom.images.length
                      : 0
                  )
                }
              />
            </div>

            <div className="info-02">
              <div>
                <p>Count:{room.count}</p>

                <ul className="u-list-02">
                  <li>Room Type: {room.exampleRoom.roomType}</li>
                  <li>Room Description: {room.exampleRoom.roomDescription}</li>
                  <li>Bed Count: {room.exampleRoom.bedCount}</li>
                  <li>Price: {room.exampleRoom.roomPrice.$numberDecimal}</li>
                  <li>Facilities:</li>
                  <ul className="u-list-02">
                    {room.exampleRoom.facilities.map((facility, idx) => (
                      <li key={idx}>{facility}</li>
                    ))}
                  </ul>
                </ul>
              </div>

              <div className="buttons-02">
                <button
                  className="button-02"
                  onClick={() => setPopupVisible(!isPopupVisible)}
                >
                  Information
                </button>
                <button className="button-02">Book</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No data to display</p>
      )}
      {isPopupVisible && (
        <div className="popup-container-02">
          <div className="popup-content-02">
            <button
              className="button-02"
              onClick={() => setPopupVisible(false)}
            >
              X
            </button>
            <RoomDetailsCard />
          </div>
        </div>
      )}
    </Container>
  );
}

export default RoomInfoCard;

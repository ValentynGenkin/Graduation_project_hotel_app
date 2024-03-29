import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch.js";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import MakeBooking from "./MakeBooking";
import "../CSS/Booking.css";

function SearchBlockAdmin() {
  const serverDomain = window.location.origin;
  const [response, setResponse] = useState(null);

  const [roomIdx, setRoomIdx] = useState({});

  const queryParams = new URLSearchParams(useLocation().search);

  let checkIn = queryParams.get("checkIn");
  let checkOut = queryParams.get("checkOut");

  checkIn = new Date(checkIn).toString();
  checkOut = new Date(checkOut).toString();

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/rooms?checkIn=${checkIn}&checkOut=${checkOut}`,
    (response) => {
      setResponse(response);

      const initialIdx = {};
      response.rooms.forEach((room) => {
        initialIdx[room.exampleRoom._id] = 0;
      });
      setRoomIdx(initialIdx);
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

  const nextSlide = (imageLength, roomId) => {
    setRoomIdx((prevRoomIdx) => ({
      ...prevRoomIdx,
      [roomId]: (prevRoomIdx[roomId] + 1) % imageLength,
    }));
  };

  const prevSlide = (imageLength, roomId) => {
    setRoomIdx((prevRoomIdx) => ({
      ...prevRoomIdx,
      [roomId]: (prevRoomIdx[roomId] - 1 + imageLength) % imageLength,
    }));
  };

  return (
    <>
      <Container>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : response && response.rooms && response.rooms.length > 0 ? (
          response.rooms.map((room, index) => (
            <div key={index} className="block-02-06">
              <div className="carousel-02-06">
                <BsArrowLeftCircleFill
                  className="arrow-02-06 arrow-left-02-06"
                  onClick={() =>
                    prevSlide(
                      room.exampleRoom && room.exampleRoom.images
                        ? room.exampleRoom.images.length
                        : 0,
                      room.exampleRoom._id
                    )
                  }
                />
                <div className="div-slider-02-02-06">
                  <img
                    className="img-slider-02-06"
                    src={
                      serverDomain + room.exampleRoom && room.exampleRoom.images
                        ? room.exampleRoom.images[
                            roomIdx[room.exampleRoom._id] || 0
                          ]
                        : ""
                    }
                    alt={room.roomType}
                  />
                </div>
                <BsArrowRightCircleFill
                  className="arrow-02-06 arrow-right-02-06"
                  onClick={() =>
                    nextSlide(
                      room.exampleRoom && room.exampleRoom.images
                        ? room.exampleRoom.images.length
                        : 0,
                      room.exampleRoom._id
                    )
                  }
                />
              </div>

              <div className="info-02-06">
                <div className="info-02-02-06">
                  <ul className="u-list-02-06">
                    <li>Count:{room.count}</li>
                    <li>Room Type: {room.exampleRoom.roomType}</li>
                    <li>
                      Room Description: {room.exampleRoom.roomDescription}
                    </li>
                    <li>Bed Count: {room.exampleRoom.bedCount}</li>
                    <li>Price: {room.exampleRoom.roomPrice.$numberDecimal}</li>
                    <li>Facilities:</li>
                    <ul className="u-list-02-06">
                      {room.exampleRoom.facilities.map((facility, idx) => (
                        <li key={facility + idx}>{facility}</li>
                      ))}
                    </ul>
                  </ul>
                </div>

                <div className="buttons-02">
                  <MakeBooking
                    checkIn={checkIn}
                    checkOut={checkOut}
                    roomId={room.exampleRoom._id}
                    className="button-02"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>
            No available rooms on that date.
            <br />
            please choose another date.
          </p>
        )}
      </Container>
    </>
  );
}

export default SearchBlockAdmin;

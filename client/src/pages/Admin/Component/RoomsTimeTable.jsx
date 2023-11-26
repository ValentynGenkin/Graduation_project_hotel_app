import React, { useState, useEffect } from "react";
import "../CSS/RoomTable.css";
import useFetch from "../../../hooks/useFetch";

const RoomTable = () => {
  const [roomAvailability, setAvailability] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(1);

  useEffect(() => {
    const today = new Date();
    const formattedStartDate = today.toLocaleDateString("en-GB");
    setStartDate(formattedStartDate);

    const endDate = new Date();
    endDate.setDate(today.getDate() + 7);
    const formattedEndDate = endDate.toLocaleDateString("en-GB");
    setEndDate(formattedEndDate);
  }, []);

  const { performFetch } = useFetch(
    `/admin/dashboard/bookings?startDate=${startDate}&endDate=${endDate}&page=${currentPage}`,
    (res) => {
      setAvailability(res.rooms);
      setPagination(res.pagination);
    }
  );

  let [dateHeaders, setDateHeaders] = useState([]);
  useEffect(() => {
    let res = [];
    if (startDate && endDate) {
      res.push(startDate);
      for (let i = 1; i <= 6; i++) {
        const forDate = new Date(
          parseInt(startDate.split("/")[2], 10),
          parseInt(startDate.split("/")[1], 10) - 1,
          parseInt(startDate.split("/")[0], 10) + i
        );
        res.push(forDate.toLocaleDateString("en-GB"));
      }

      setDateHeaders(res);
      if (endDate) {
        performFetch({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
      }
    }
  }, [startDate, currentPage]); // Include currentPage as a dependency

  const getCellBackgroundColor = (room, date, period) => {
    let value = "whitesmoke";
    if (room && room.bookings && room.bookings.length > 0) {
      room.bookings.forEach((booking) => {
        const checkIn = new Date(booking.checkIn);
        const checkout = new Date(booking.checkOut);
        const currentDateObj = new Date(
          parseInt(startDate.split("/")[2], 10),
          parseInt(startDate.split("/")[1], 10) - 1,
          parseInt(startDate.split("/")[0], 10) + date
        );
        checkIn.setHours(12, 0, 0, 0);
        checkout.setHours(11, 59, 0, 0);
        if (period === "morning") {
          currentDateObj.setHours(11, 57, 0, 0);
        } else {
          currentDateObj.setHours(12, 11, 0, 0);
        }

        if (currentDateObj >= checkIn && currentDateObj <= checkout) {
          value = "red";
        }
      });
    }

    return value;
  };

  const handleDateChange = (days) => {
    const formattedStart = new Date(
      parseInt(startDate.split("/")[2], 10),
      parseInt(startDate.split("/")[1], 10) - 1,
      parseInt(startDate.split("/")[0], 10) + days
    );
    const formattedEnd = new Date(
      parseInt(startDate.split("/")[2], 10),
      parseInt(startDate.split("/")[1], 10) - 1,
      parseInt(startDate.split("/")[0], 10) + days + 7
    );
    const formattedStartDayString = formattedStart.toLocaleDateString("en-GB");
    const formattedEndDateString = formattedEnd.toLocaleDateString("en-GB");
    setStartDate(formattedStartDayString);
    setEndDate(formattedEndDateString);
    // setCurrentPage(1);
  };
  const handlePrevPage = () => {
    if (currentPage - 1 !== 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (pagination.next) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="body-wrapper">
      <div className="date-navigation">
        <button onClick={() => handleDateChange(-1)}>-</button>
        <span>{startDate}</span>
        <button onClick={() => handleDateChange(1)}>+</button>
      </div>
      <div className="table-wrapper">
        <div className="table-header">
          <p className="header-title">Room #</p>
          {dateHeaders &&
            dateHeaders.length > 6 &&
            dateHeaders.map((date, index) => (
              <div
                key={index}
                className={`header-column ${
                  index === dateHeaders.length - 1 ? "last" : ""
                }`}
              >
                <p>{date}</p>
              </div>
            ))}
        </div>

        <div className="table-body">
          {roomAvailability.length > 0 &&
            roomAvailability.map((room) => (
              <div className="table-row" key={room._id}>
                <div className={"table-column1"}>
                  <div>
                    <p>{room.roomNo}</p>
                  </div>
                </div>
                {Array.from({ length: 7 }, (_, index) => (
                  <div
                    key={index}
                    className={`table-column1 ${index === 6 ? "end" : ""}`}
                  >
                    <div
                      style={{
                        width: "50%",
                        height: "100%",
                        backgroundColor: getCellBackgroundColor(
                          room,
                          index,
                          "morning"
                        ),
                      }}
                    ></div>
                    <div
                      style={{
                        width: "50%",
                        height: "100%",
                        backgroundColor: getCellBackgroundColor(
                          room,
                          index,
                          "evening"
                        ),
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <button onClick={handlePrevPage}>-</button>
        <p
          style={{
            width: "40px",
            border: "none",
            outline: "none",
            marginBottom: "0px",
          }}
        >
          {currentPage}
        </p>
        <button onClick={handleNextPage}>+</button>
        Total Rooms : {pagination.total}
      </div>
    </div>
  );
};

export default RoomTable;

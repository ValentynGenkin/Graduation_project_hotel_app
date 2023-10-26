import React, { useState } from "react";
import "../CSS/RoomTable.css";

const RoomTable = () => {
  const [roomAvailability] = useState([
    {
      roomNumber: 1,
      reservations: [
        {
          from: "Wed Oct 28 2023 12:00:00 GMT+0200",
          to: "Wed Oct 31 2023 12:00:00 GMT+0200",
        },
      ],
    },
    {
      roomNumber: 2,
      reservations: [
        {
          from: "Wed Oct 21 2023 12:00:00 GMT+0200",
          to: "Wed Oct 30 2023 12:00:00 GMT+0200",
        },
        {
          from: "Wed Oct 28 2023 12:00:00 GMT+0200",
          to: "Wed Oct 30 2023 12:00:00 GMT+0200",
        },
      ],
    },
    {
      roomNumber: 3,
      reservations: [
        {
          from: "Wed Oct 21 2023 12:00:00 GMT+0200",
          to: "Wed Oct 23 2023 12:00:00 GMT+0200",
        },
        {
          from: "Wed Oct 28 2023 12:00:00 GMT+0200",
          to: "Wed Oct 30 2023 12:00:00 GMT+0200",
        },
      ],
    },
    {
      roomNumber: 4,
      reservations: [
        {
          from: "Wed Oct 21 2023 12:00:00 GMT+0200",
          to: "Wed Oct 23 2023 12:00:00 GMT+0200",
        },
        {
          from: "Wed Oct 28 2023 12:00:00 GMT+0200",
          to: "Wed Oct 30 2023 12:00:00 GMT+0200",
        },
      ],
    },
  ]);
  const [currentDate, setCurrentDate] = useState(new Date()); // Initialize currentDate state

  const dateHeaders = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + index);
    return date.toISOString().split("T")[0];
  });

  const getCellBackgroundColor = (room, date, period) => {
    let value = "white";
    if (room && room.reservations && room.reservations.length > 0) {
      room.reservations.forEach((reservation) => {
        const checkIn = new Date(reservation.from);
        const checkout = new Date(reservation.to);
        let currentDate = new Date(date);

        if (period === "morning") {
          currentDate.setHours(6, 0, 0, 0);
        } else if (period === "evening") {
          currentDate.setHours(18, 0, 0, 0);
        }

        if (currentDate >= checkIn && currentDate <= checkout) {
          value = "red";
        }
      });
    }

    return value;
  };

  const handleDateChange = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const handleReservation = (room, date, period) => {
    let currentDate = new Date(date);

    if (period === "m") {
      currentDate.setHours(6, 0, 0, 0);
    } else if (period === "e") {
      currentDate.setHours(18, 0, 0, 0);
    }

    // Format the date in the desired format
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    const formattedDate = currentDate.toLocaleString("en-US", options);

    // Convert dates to Unix timestamps in seconds
    const currentTimestamp = Math.floor(currentDate.getTime() / 1000);
    const checkinTimestamp = Math.floor(new Date(room.from).getTime() / 1000);
    const checkoutTimestamp = Math.floor(new Date(room.to).getTime() / 1000);

    // Calculate the time differences in seconds
    const timeDiffToCheckin = Math.abs(currentTimestamp - checkinTimestamp);
    const timeDiffToCheckout = Math.abs(currentTimestamp - checkoutTimestamp);

    if (timeDiffToCheckin < timeDiffToCheckout) {
      console.log("Current date is closer to checkIn.");
      const newReservations = [...roomAvailability];
    } else {
      console.log("Current date is closer to checkout.");
    }
  };

  return (
    <div className="body-wrapper wrapper">
      <div className="date-navigation">
        <button onClick={() => handleDateChange(-1)}>-</button>
        <span>{currentDate.toDateString()}</span>
        <button onClick={() => handleDateChange(1)}>+</button>
      </div>
      <table border="1">
        <tr>
          <th>Room Number</th>
          {dateHeaders.map((date, index) => (
            <th key={index}>{date}</th>
          ))}
        </tr>
        {roomAvailability.map((room) => (
          <tr key={room.roomNumber}>
            <td style={{ position: "relative" }}>{room.roomNumber}</td>
            {dateHeaders.map((date, index) => (
              <td
                key={index}
                style={{
                  margin: "0px",
                  padding: "0px",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: getCellBackgroundColor(
                        room,
                        date,
                        "morning"
                      ),
                      width: "50%",
                      height: "70px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => handleReservation(room, date, "m")}
                  >
                    {/* Content for the 'morning' cell */}
                  </div>
                  <div
                    style={{
                      backgroundColor: getCellBackgroundColor(
                        room,
                        date,
                        "evening"
                      ),
                      width: "50%",
                      height: "70px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => handleReservation(room, date, "e")}
                  >
                    {/* Content for the 'evening' cell */}
                  </div>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default RoomTable;

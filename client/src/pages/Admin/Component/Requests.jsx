import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-toastify";

import "../CSS/Requests.css";

const RoomTable = () => {
  const [roomRequests, setRoomRequests] = useState([]);

  const { performFetch } = useFetch("/booking/roomPopulated", (res) => {
    if (res.success) {
      setRoomRequests(res.tasksPopulated);
    }
  });

  useEffect(() => {
    performFetch({
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "GET",
    });
  }, []);

  const handleStatusChange = (roomId, newStatus) => {
    toast.success(`Room ID ${roomId} - Status changed to ${newStatus}`);
  };

  return (
    <div className="custom-body-request">
      <table className="custom-table" border="1">
        <thead>
          <tr>
            <th className="custom-th">Room Number</th>
            <th className="custom-th">Booking ID</th>
            <th className="custom-th">Task</th>
            <th className="custom-th">Status</th>
          </tr>
        </thead>
        <tbody>
          {roomRequests.length > 0 ? (
            roomRequests.map((request) => (
              <tr key={request._id}>
                <td className="custom-td">
                  {request.bookingDetailId?.roomId?.roomNo || "No Number"}
                </td>
                <td className="custom-td">{request.bookingId}</td>
                <td className="custom-td">{request.task}</td>
                <td className="custom-td">
                  <select
                    className="custom-select"
                    value={request.status}
                    onChange={(e) =>
                      handleStatusChange(request._id, e.target.value)
                    }
                  >
                    {["open", "in-process", "closed"].map((statusOption) => (
                      <option
                        key={statusOption}
                        value={statusOption}
                        className={`custom-${statusOption}`}
                      >
                        {statusOption.charAt(0).toUpperCase() +
                          statusOption.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTable;

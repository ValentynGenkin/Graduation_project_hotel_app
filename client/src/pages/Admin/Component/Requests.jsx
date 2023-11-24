import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-toastify";

import "../CSS/Requests.css";

const RoomTable = () => {
  const [roomRequests, setRoomRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRequests, setTotalRequests] = useState(0);
  const { performFetch } = useFetch(
    `/booking/roomPopulated?page=${currentPage}&limit=10`, // Use a fixed limit or replace it as needed
    (res) => {
      if (res.success) {
        setRoomRequests(res.tasksPopulated);
        setTotalRequests(res.totalTasks);
      }
    }
  );

  useEffect(() => {
    performFetch({
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "GET",
    });
  }, [currentPage]);

  const handleStatusChange = (requestId, newStatus) => {
    const updatedRoomRequests = [...roomRequests];
    const index = updatedRoomRequests.findIndex(
      (request) => request._id === requestId
    );

    // If the request is found, update its status
    if (index !== -1) {
      updatedRoomRequests[index] = {
        ...updatedRoomRequests[index],
        status: newStatus,
      };

      // Update state with the modified array
      setRoomRequests(updatedRoomRequests);

      // Display a success toast
      toast.success(`Request ID ${requestId} - Status changed to ${newStatus}`);
    } else {
      throw new Error(`Request with ID ${requestId} not found.`);
    }
  };

  const onBtNext = () => {
    if (currentPage < Math.ceil(totalRequests / 10)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onBtPrevious = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (e) => {
    const newPage = e.target.value;
    if (
      !isNaN(newPage) &&
      newPage > 0 &&
      newPage <= Math.ceil(totalRequests / 10)
    ) {
      setCurrentPage(newPage);
    }
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
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={onBtPrevious}
          style={{ outline: "none", width: "30px", border: "none" }}
        >
          <p style={{ margin: "0px" }}>-</p>
        </button>
        <input
          type="number"
          value={currentPage}
          onChange={(e) => handlePageChange(e)}
          style={{ width: "40px", border: "none", outline: "none" }}
        />
        <button
          style={{ outline: "none", width: "30px", border: "none" }}
          onClick={onBtNext}
        >
          +
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginRight: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ margin: "0px" }}>Total Requests :</p>
          <p style={{ margin: "0px" }}>{totalRequests}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ margin: "0px" }}>Total Page :</p>
          <p style={{ margin: "0px" }}>{Math.ceil(totalRequests / 10)}</p>
        </div>
      </div>
    </div>
  );
};

export default RoomTable;

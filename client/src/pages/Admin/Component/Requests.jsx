import React, { useState } from "react";
import "../CSS/Requests.css";

const RoomTable = () => {
  const [roomRequests, setRoomRequests] = useState([
    {
      roomId: 1,
      clientId: 101,
      clientName: "John Doe",
      clientEmail: "john@example.com",
      clientNumber: "555-123-4567",
      clientRequest: "I need a towel",
      status: "approved",
    },
    {
      roomId: 2,
      clientId: 102,
      clientName: "Alice Smith",
      clientEmail: "alice@example.com",
      clientNumber: "555-987-6543",
      clientRequest: "Request 2",
      status: "in progress",
    },
    {
      roomId: 3,
      clientId: 103,
      clientName: "Bob Johnson",
      clientEmail: "bob@example.com",
      clientNumber: "555-234-5678",
      clientRequest: "Request 3",
      status: "canceled",
    },
  ]);

  const handleStatusChange = (roomId, newStatus) => {
    // Create a new array with updated status
    const updatedRequests = roomRequests.map((request) => {
      if (request.roomId === roomId) {
        return { ...request, status: newStatus };
      }
      return request;
    });
    setRoomRequests(updatedRequests);
  };

  return (
    <div className="body-request">
      <table border="1">
        <thead>
          <tr>
            <th>Room ID</th>
            <th>Client ID</th>
            <th>Client Name</th>
            <th>Client Email</th>
            <th>Client Number</th>
            <th>Client Request</th>
            <th>Request Status</th>
          </tr>
        </thead>
        <tbody>
          {roomRequests.map((request) => (
            <tr key={request.roomId}>
              <td>{request.roomId}</td>
              <td>{request.clientId}</td>
              <td>{request.clientName}</td>
              <td>{request.clientEmail}</td>
              <td>
                <a href={`tel: ${request.clientNumber}`}>
                  <span role="img" aria-label="Phone Icon">
                    📞
                  </span>
                  {request.clientNumber}
                </a>
              </td>
              <td>{request.clientRequest}</td>
              <td>
                <select
                  value={request.status}
                  onChange={(e) =>
                    handleStatusChange(request.roomId, e.target.value)
                  }
                >
                  <option className="approved">Approved</option>
                  <option className="canceled">Canceled</option>
                  <option className="in progress">In Progress</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTable;

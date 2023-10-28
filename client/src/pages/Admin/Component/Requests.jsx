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
      clientRequest:
        "Hello, I have a reservation under the name john kennedy for November 20th to November 25th. Due to my flight's arrival time, I kindly request an early check-in around 12:00 PM on the arrival date. Furthermore, I would also like to request a late check-out at around 2:00 PM on the departure date to align with my travel schedule. Your flexibility and assistance with these timing adjustments would be of great help. Thank you in advance for your consideration",
      status: "approved",
    },
    {
      roomId: 2,
      clientId: 102,
      clientName: "Alice Smith",
      clientEmail: "alice@example.com",
      clientNumber: "555-987-6543",
      clientRequest:
        "To Whom It May Concern, I will be staying at your hotel from November 12th to November 15th and require some special accommodations due to dietary restrictions. I am allergic to nuts and gluten, and it would be greatly appreciated if the hotel restaurant could provide meal options that cater to these restrictions. Additionally, I would like to request hypoallergenic bedding to ensure a comfortable stay. Your attention to these details is highly valued. Thank you for your assistance",
      status: "in progress",
    },
    {
      roomId: 3,
      clientId: 103,
      clientName: "Bob Johnson",
      clientEmail: "bob@example.com",
      clientNumber: "555-234-5678",
      clientRequest:
        "Dear Hotel Management, I am writing to request a specific room preference for my upcoming stay from October 30th to November 5th. I have a preference for a room with a view overlooking the city skyline or a room on a higher floor to minimize outside noise. Additionally, if possible, I would appreciate a non-smoking room. Your assistance in accommodating these preferences would be greatly appreciated. Thank you.",
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

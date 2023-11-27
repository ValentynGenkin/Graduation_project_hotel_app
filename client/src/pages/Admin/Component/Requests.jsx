import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "../CSS/Requests.css";

const RoomTable = ({ rooms }) => {
  const computeInitialTasks = () => {
    return rooms?.reduce((acc, room) => {
      room.bookings.forEach((booking) => {
        booking.taskIds.forEach((task) =>
          acc[room.roomNo]
            ? acc[room.roomNo].push(task)
            : (acc[room.roomNo] = [task])
        );
      });
      return acc;
    }, {});
  };

  const [tasks, setTasks] = useState(computeInitialTasks);
  const [taskUpdateInfo, setTaskUpdateInfo] = useState();

  useEffect(() => {}, [tasks]);
  useEffect(() => {
    // This will recompute tasks when rooms prop changes
    const newInitialTasks = computeInitialTasks();
    setTasks(newInitialTasks);
  }, [rooms]);

  const { error: updateError, performFetch: performUpdateFetch } = useFetch(
    "/task/update",
    (res) => {
      if (res.success) {
        toast.success("Update task is  successful");
      }
    }
  );

  useEffect(() => {
    if (taskUpdateInfo) {
      performUpdateFetch({
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          taskId: taskUpdateInfo[0],
          taskStatus: taskUpdateInfo[1],
          updateMessage: taskUpdateInfo[1],
        }),
      });
    }

    if (!updateError && taskUpdateInfo) {
      setTasks((prevState) => {
        // Creating a deep copy of the state
        const updatedTasks = JSON.parse(JSON.stringify(prevState));

        // Finding the correct task and updating its status
        if (updatedTasks[taskUpdateInfo[2]]) {
          const taskIndex = updatedTasks[taskUpdateInfo[2]].findIndex(
            (t) => t._id === taskUpdateInfo[0]
          );
          if (taskIndex !== -1) {
            updatedTasks[taskUpdateInfo[2]][taskIndex].status =
              taskUpdateInfo[1];
          }
        }

        return updatedTasks;
      });
    }
  }, [taskUpdateInfo]);

  const handleStatusChange = (roomNo, taskId, newStatus) => {
    setTaskUpdateInfo([taskId, newStatus, roomNo]);
  };
  return (
    <div className="custom-body-request">
      <table className="custom-table" border="1">
        <thead>
          <tr>
            <th className="custom-th" style={{ width: "80px" }}>
              Room #
            </th>
            <th className="custom-th" style={{ width: "250px" }}>
              Booking ID
            </th>
            <th className="custom-th">Task</th>
            <th className="custom-th" style={{ width: "120px" }}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks && Object.keys(tasks).length > 0 ? (
            Object.keys(tasks).map((roomNo) => {
              const tasksOfRoom = tasks[roomNo];
              const tasksByRoom = tasksOfRoom.map((task) => {
                return (
                  <tr key={task._id}>
                    <td className="custom-td">{roomNo || "No Number"}</td>
                    <td className="custom-td">{task.updateMessage}</td>
                    <td className="custom-td">{task.task}</td>
                    <td className="custom-td">
                      <select
                        className="custom-select"
                        value={task.status}
                        onChange={(e) => {
                          handleStatusChange(roomNo, task._id, e.target.value);
                        }}
                      >
                        {["open", "in-process", "closed"].map(
                          (statusOption) => (
                            <option
                              key={statusOption}
                              value={statusOption}
                              className={`custom-${statusOption}`}
                            >
                              {statusOption.charAt(0).toUpperCase() +
                                statusOption.slice(1)}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                  </tr>
                );
              });
              return tasksByRoom;
            })
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
RoomTable.propTypes = {
  rooms: PropTypes.array.isRequired,
};
export default RoomTable;

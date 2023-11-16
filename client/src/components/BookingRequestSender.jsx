import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { Button, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

const BookingRequestSender = ({
  idControl,
  tasks,
  bookingId,
  bookingDetailId,
  performFetchTask,
  isLoadingTask,
  errorTask,
}) => {
  const [taskMsg, setTaskMsg] = useState(null);
  const sendNewTask = (msg, bookingId, bookingDetailId) => {
    performFetchTask({
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        bookingId: bookingId,
        bookingDetailId: bookingDetailId,
        taskMessage: msg,
      }),
    });
  };

  return (
    <Accordion>
      <Accordion.Item eventKey="0" className="bookings-accordion">
        <Accordion.Header className="bookings-accordion-header">
          <span>Send a request</span>
        </Accordion.Header>
        <Accordion.Body>
          <h6>Send a request</h6>

          <FloatingLabel controlId={idControl} label="Comments">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              className="comment-text-area"
              onChange={(e) => {
                setTaskMsg(e.target.value);
              }}
            />
          </FloatingLabel>
          {errorTask && (
            <p style={{ color: "red", fontSize: "13px", zIndex: "100" }}>
              {errorTask.toString()}
            </p>
          )}
          <Button
            variant="outline-secondary"
            className="request-send-btn"
            onClick={() => {
              sendNewTask(taskMsg, bookingId, bookingDetailId);
            }}
          >
            {isLoadingTask ? (
              <Spinner
                as="div"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Send"
            )}
          </Button>

          <Table className="client-request-table">
            <thead>
              <tr>
                <th className="booking-table-number">#</th>
                <th className="booking-table-request">Request</th>
                <th className="booking-table-status">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks &&
                tasks.taskIds.map((task, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{task.task}</td>
                    <td>{task.status}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default BookingRequestSender;

BookingRequestSender.propTypes = {
  idControl: PropTypes.string.isRequired,
  tasks: PropTypes.object.isRequired,
  bookingDetailId: PropTypes.string.isRequired,
  bookingId: PropTypes.string.isRequired,
  performFetchTask: PropTypes.func.isRequired,
  isLoadingTask: PropTypes.bool,
  errorTask: PropTypes.string,
};

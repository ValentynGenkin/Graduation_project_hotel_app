import React from "react";
import Accordion from "react-bootstrap/Accordion";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const BookingRequestSender = ({ idControl }) => {
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
            />
          </FloatingLabel>
          <Button variant="outline-secondary" className="request-send-btn">
            Send
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
              <tr>
                <td>1</td>
                <td>Hello I would like ...</td>
                <td>Done</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Hello I would like ...</td>
                <td>Canceled</td>
              </tr>
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
};

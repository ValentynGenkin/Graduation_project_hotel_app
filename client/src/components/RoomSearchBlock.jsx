import { Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";

const RoomSearchBlock = () => {
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState();

  const onChange = (nextValue) => {
    setValue(nextValue);
  };

  // ["yyyy-mm-dd", "yyyy-mm-dd"]

  const checkInDate = new Date(value[0]);
  const checkOutDate = new Date(value[1]);

  const formattedCheckInDate = `${checkInDate.getFullYear()}-${
    checkInDate.getMonth() + 1
  }-${checkInDate.getDate()}`;

  const formattedCheckOutDate = `${checkOutDate.getFullYear()}-${
    checkOutDate.getMonth() + 1
  }-${checkOutDate.getDate()}`;

  useEffect(() => {
    setDate([formattedCheckInDate, formattedCheckOutDate]);
  }, [value]);

  return (
    <Container>
      <input placeholder="Check in date" value={date && date[0]} />
      <input placeholder="Check out date" value={date && date[1]} />
      <Calendar
        selectRange={true}
        onChange={onChange}
        value={value}
        minDate={new Date()}
        minDetail={"year"}
      />
    </Container>
  );
};

export default RoomSearchBlock;

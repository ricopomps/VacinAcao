import React from "react";
import Button from "react-bootstrap/Button";
const CalendarDay = ({ onClick }) => {
  return (
    <Button variant="success" onClick={onClick}>
      09:00
    </Button>
  );
};

export default CalendarDay;

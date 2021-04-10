import React from "react";
import Button from "react-bootstrap/Button";
const CalendarDay = ({ onClick, children }) => {
  return (
    <Button variant="success" onClick={onClick}>
      {children}
    </Button>
  );
};

export default CalendarDay;

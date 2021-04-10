import React from "react";
import Button from "react-bootstrap/Button";
const CalendarDay = ({ onClick, children, vacancy }) => {
  return (
    <Button variant={vacancy} onClick={onClick}>
      {children}
    </Button>
  );
};

export default CalendarDay;

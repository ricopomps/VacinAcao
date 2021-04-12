import React from "react";
import Button from "react-bootstrap/Button";
const CalendarDay = ({ onClick, children, vacancy, disabled }) => {
  return (
    <Button variant={vacancy} disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  );
};

export default CalendarDay;

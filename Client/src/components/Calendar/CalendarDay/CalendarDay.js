import React from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
const CalendarDay = ({ onClick, children, vacancy, disabled, tooltip }) => {
  return (
    <OverlayTrigger
      overlay={<Tooltip id="tooltip-disabled">{tooltip}</Tooltip>}
    >
      <span className="d-inline-block">
        <Button
          style={{ pointerEvents: disabled && "none" }}
          variant={vacancy}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </Button>
      </span>
    </OverlayTrigger>
  );
};

export default CalendarDay;

import React from "react";

const Shift = (props) => (
  <i
    onClick={props.onClick}
    style={{ cursor: "pointer" }}
    className="fa fa-bars"
    aria-hidden="true"
  />
);

export default Shift;

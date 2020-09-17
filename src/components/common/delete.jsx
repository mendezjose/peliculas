import React from "react";

const Delete = (props) => (
  <i
    onClick={props.onClick}
    style={{ cursor: "pointer" }}
    className="fa fa-trash"
    aria-hidden="true"
  />
);

export default Delete;

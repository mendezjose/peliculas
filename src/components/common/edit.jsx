import React from "react";

const Edit = (props) => (
  <i
    onClick={props.onClick}
    style={{ cursor: "pointer" }}
    className="fa fa-pencil"
    aria-hidden="true"
  />
);

export default Edit;

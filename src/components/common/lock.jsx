import React from "react";

const Lock = (props) => (
  <i
    className={props.status === "Activo" ? "fa fa-lock" : "fa fa-unlock-alt"}
    aria-hidden="true"
  />
);

export default Lock;

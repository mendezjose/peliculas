import React, { Component } from "react";
import Table from "./common/table";
import Edit from "./common/edit";
import Delete from "./common/delete";
import Lock from "./common/lock";

class ShiftsTable extends Component {
  columns = [
    { path: "id", label: "Id" },
    {
      path: "time",
      label: "Turno",
    },
    { path: "status", label: "Estado" },
    {
      key: "edit",
      content: (shift) => <Edit onClick={() => this.props.onEdit(shift)} />,
    },
    {
      key: "lock",
      content: (shift) => <Lock status={shift.status} />,
    },
    {
      key: "delete",
      content: (shift) => <Delete onClick={() => this.props.onDelete(shift)} />,
    },
  ];

  render() {
    const { shifts, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={shifts}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ShiftsTable;

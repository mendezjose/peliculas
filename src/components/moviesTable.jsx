import React, { Component } from "react";
import Table from "./common/table";
import Edit from "./common/edit";
import Delete from "./common/delete";
import Shift from "./common/shift";
import Lock from "./common/lock";
import { getShift } from "../services/shiftsService";

class MoviesTable extends Component {
  columns = [
    { path: "id", label: "Id" },
    {
      path: "title",
      label: "Nombre",
    },
    {
      path: "date",
      label: "Fecha",
      content: (movie) => this.props.getDate(movie.date),
    },
    { path: "status", label: "Estado" },
    {
      path: "shift",
      label: "Turno",
      content: (movie) => getShift(movie.shiftId).time,
    },
    {
      key: "edit",
      content: (movie) => <Edit onClick={() => this.props.onEdit(movie)} />,
    },
    {
      key: "shift",
      content: (movie) => <Shift onClick={() => this.props.onAssign(movie)} />,
    },
    {
      key: "lock",
      content: (movie) => <Lock status={movie.status} />,
    },
    {
      key: "delete",
      content: (movie) => <Delete onClick={() => this.props.onDelete(movie)} />,
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;

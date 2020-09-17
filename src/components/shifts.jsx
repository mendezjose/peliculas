import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ShiftsTable from "./shiftsTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import Sidebar from "./sidebar";
import ShiftModal from "./shiftModal";
import { deleteShift, getShifts } from "../services/shiftsService";

class Shifts extends Component {
  state = {
    modalShow: false,
    shifts: [],
    currentPage: 1,
    pageSize: 8,
    selectedShift: null,
    sortColumn: { path: "id", order: "asc" },
  };

  componentDidMount() {
    const shifts = getShifts();
    this.setState({ shifts });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleEdit = (selectedShift) => {
    this.setState({ selectedShift });
    this.setState({ modalShow: true });
  };

  handleDelete = (shift) => {
    deleteShift(shift.id);
    const shifts = getShifts();
    this.setState({ shifts });
  };

  newShift = () => {
    const selectedShift = {
      time: "",
      status: "Inactivo",
    };
    this.setState({ selectedShift });
    this.setState({ modalShow: true });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, shifts: allShifts } = this.state;
    const sorted = _.orderBy(allShifts, [sortColumn.path], [sortColumn.order]);
    const shifts = paginate(sorted, currentPage, pageSize);
    return { totalCount: sorted.length, data: shifts };
  };

  render() {
    const { length: count } = this.state.shifts;
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedShift,
      modalShow,
    } = this.state;

    const { totalCount, data: shifts } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row ">
          <Sidebar />
          <div className="col border-left p-3">
            <div className="d-flex justify-content-between">
              <h1>Turnos</h1>
              <Button
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
                onClick={this.newShift}
              >
                Nuevo Turno
              </Button>
            </div>
            {count === 0 && (
              <div className="mt-4">
                <p>No hay ningun turno para mostrar.</p>
              </div>
            )}
            {count > 0 && (
              <ShiftsTable
                shifts={shifts}
                sortColumn={sortColumn}
                onEdit={this.handleEdit}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
            )}
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
        {modalShow && (
          <ShiftModal
            show={true}
            onHide={() => this.setState({ modalShow: false })}
            shift={selectedShift}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Shifts;

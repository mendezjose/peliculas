import React, { Component } from "react";
import { Button } from "react-bootstrap";
import _ from "lodash";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import Sidebar from "./sidebar";
import MovieModal from "./movieModal";
import ShiftAssign from "./shiftAssign";
import { paginate } from "../utils/paginate";
import { getMovies, deleteMovie } from "../services/movieService";

class Movies extends Component {
  state = {
    modalShow: false,
    shiftAssign: false,
    movies: [],
    currentPage: 1,
    pageSize: 8,
    selectedMovie: null,
    sortColumn: { path: "id", order: "asc" },
  };

  componentDidMount() {
    const movies = getMovies();
    this.setState({ movies });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleEdit = (selectedMovie) => {
    this.setState({ selectedMovie });
    this.setState({ modalShow: true });
  };

  handleDelete = (movie) => {
    deleteMovie(movie.id);
    const movies = getMovies();
    this.setState({ movies });
  };

  newMovie = () => {
    const selectedMovie = {
      title: "",
      date: new Date(),
      status: "Inactivo",
    };
    this.setState({ selectedMovie });
    this.setState({ modalShow: true });
  };

  assignShiftToMovie = (movie) => {
    this.setState({ selectedMovie: movie });
    this.setState({ shiftAssign: true });
  };

  getDate = (date) =>
    `${date.getDate()}/${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }/${date.getFullYear()}`;

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, movies: allMovies } = this.state;
    const sorted = _.orderBy(allMovies, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: sorted.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedMovie,
      modalShow,
      shiftAssign,
    } = this.state;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row ">
          <Sidebar />
          {!shiftAssign && (
            <div className="col border-left p-3">
              <div className="d-flex justify-content-between">
                <h1>Películas</h1>
                <Button
                  className="btn btn-primary"
                  style={{ marginBottom: 20 }}
                  onClick={this.newMovie}
                >
                  Nueva Película
                </Button>
              </div>
              {count === 0 && (
                <div className="mt-4">
                  <p>No hay ninguna película para mostrar.</p>
                </div>
              )}
              {count > 0 && (
                <MoviesTable
                  movies={movies}
                  sortColumn={sortColumn}
                  onEdit={this.handleEdit}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                  getDate={this.getDate}
                  onAssign={this.assignShiftToMovie}
                />
              )}
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          )}
          {shiftAssign && (
            <ShiftAssign
              movie={selectedMovie}
              close={() => this.setState({ shiftAssign: false })}
            />
          )}
        </div>
        {modalShow && (
          <MovieModal
            show={true}
            onHide={() => this.setState({ modalShow: false })}
            movie={selectedMovie}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Movies;

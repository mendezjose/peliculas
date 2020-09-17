import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { saveMovie } from "../services/movieService";
import "react-datepicker/dist/react-datepicker.css";

export default function MovieModal(props) {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieDate, setMovieDate] = useState(new Date());
  const [movieStatus, setMovieStatus] = useState("");

  useEffect(() => {
    if (props.movie) {
      setMovieTitle(props.movie.title);
      setMovieDate(props.movie.date);
      setMovieStatus(props.movie.status);
    }
    return () => setMovieTitle(props.movie.title);
  }, [props.movie]);

  const handleTitleChange = (event) => setMovieTitle(event.target.value);

  const handleStatusChange = (event) => setMovieStatus(event.target.value);

  const handleSave = () => {
    const movie = {
      id: props.movie.id,
      title: movieTitle,
      date: movieDate,
      status: movieStatus,
      shift: props.movie.shift,
    };
    saveMovie(movie);
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.movie.id ? "Editar Película" : "Nueva Película"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Row className="m-3">
            <Col xs={4}>
              <Form.Label>Nombre de Película</Form.Label>
            </Col>
            <Col xs={8}>
              <Form.Control
                type="text"
                value={movieTitle}
                onChange={handleTitleChange}
              />
            </Col>
          </Form.Row>
          <Form.Row className="m-3">
            <Col xs={4}>
              <Form.Label>Fecha de Publicación</Form.Label>
            </Col>
            <Col xs={8}>
              <DatePicker
                selected={movieDate}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => setMovieDate(date)}
              />
            </Col>
          </Form.Row>
          <Form.Row className="m-3">
            <Col xs={4}>
              <Form.Label>Estado</Form.Label>
            </Col>
            <Col xs={8}>
              <select
                className="custom-select"
                value={movieStatus}
                onChange={handleStatusChange}
              >
                <option value="Inactivo">Inactivo</option>
                <option value="Activo">Activo</option>
              </select>
            </Col>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
}

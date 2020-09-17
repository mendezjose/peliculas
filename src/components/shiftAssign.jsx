import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import { getShift, getShifts, as } from "../services/shiftsService";
import { assignShiftToMovie } from "../services/movieService";

const ShiftAssign = (props) => {
  const [shift, setShift] = useState({});

  useEffect(() => {
    if (props.movie) {
      setShift(getShift(props.movie.shiftId));
    }
    return () => setShift(getShift(props.movie.shiftId));
  }, [props.movie]);

  const handleTimeChange = (event) => setShift(getShift(event.target.value));

  const handleSave = () => {
    assignShiftToMovie(props.movie.id, shift.id);
    props.close();
  };

  return (
    <div className="col border-left p-3">
      <div className="d-flex justify-content-between">
        <h1>
          Turno de <small>{props.movie.title}</small>
        </h1>
      </div>
      <div className="m-5">
        <Form>
          <Form.Row className="m-3">
            <Col xs={4}>
              <Form.Label>Turno</Form.Label>
            </Col>
            <Col xs={8}>
              <select
                onChange={handleTimeChange}
                className="custom-select"
                value={shift.id}
              >
                <option value=""></option>
                {getShifts().map((s) => (
                  <option value={s.id}>{s.time}</option>
                ))}
              </select>
            </Col>
          </Form.Row>

          <Form.Row className="m-3">
            <Col xs={4}>
              <Form.Label>Estado</Form.Label>
            </Col>
            <Col xs={8}>
              <select disabled className="custom-select" value={shift.status}>
                <option value=""></option>
                <option value="Inactivo">Inactivo</option>
                <option value="Activo">Activo</option>
              </select>
            </Col>
          </Form.Row>
          <Form.Row className="m-3">
            <Button onClick={handleSave}>Guardar</Button>
          </Form.Row>
        </Form>
      </div>
    </div>
  );
};

export default ShiftAssign;

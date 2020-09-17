import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import { saveShift, getAvailableShifts } from "../services/shiftsService";

export default function ShiftModal(props) {
  const [shiftTime, setShiftTime] = useState("");
  const [shiftStatus, setShiftStatus] = useState("");

  useEffect(() => {
    if (props.shift) {
      setShiftTime(props.shift.time);
      setShiftStatus(props.shift.status);
    }
    return () => setShiftTime(props.shift.time);
  }, [props.shift]);

  const handleTimeChange = (event) => setShiftTime(event.target.value);

  const handleStatusChange = (event) => setShiftStatus(event.target.value);

  const handleSave = () => {
    const shift = {
      id: props.shift.id,
      time: shiftTime,
      status: shiftStatus,
    };
    saveShift(shift);
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
          {props.shift.id ? "Editar Turno" : "Nuevo Turno"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Row className="m-3">
            <Col xs={4}>
              <Form.Label>Turno</Form.Label>
            </Col>
            <Col xs={8}>
              <select
                className="custom-select"
                value={shiftTime}
                onChange={handleTimeChange}
              >
                {getAvailableShifts(shiftTime).map((t) => (
                  <option value={t}>{t}</option>
                ))}
              </select>
            </Col>
          </Form.Row>
          <Form.Row className="m-3">
            <Col xs={4}>
              <Form.Label>Estado</Form.Label>
            </Col>
            <Col xs={8}>
              <select
                className="custom-select"
                value={shiftStatus}
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

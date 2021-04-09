import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
const ModalComponent = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Finalizar atendimento
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <label htmlFor="description">
            <h4>Paciente: {props.name}</h4>
          </label>
          <Form.Group controlId="description">
            <Form.Control
              value={props.description}
              onChange={(e) => props.onChange}
              name="email"
              as="textarea"
              rows={3}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={props.onSubmit}>
          Finalizar atendimento
        </Button>
        <Button variant="danger" onClick={props.onHide}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;

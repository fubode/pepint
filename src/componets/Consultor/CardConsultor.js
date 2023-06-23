import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaCommentDots, FaEye, FaPrint, FaUser } from "react-icons/fa";


export const CardConsultor = ({data}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleComentario = () => {
  };
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div className="col-2 bg-success">
                <FaUser onClick={handleShow}/>
              </div>
              <div className="col-9">
                <p className="mb-0">{data.codigo}</p>
                <p className="mb-0">{data.ci}</p>
                <p className="mb-0">{data.nombre}</p>
                <p className="mb-0">{data.area}</p>
                <p className="mb-0">{data.producto}</p>
                <p className="mb-0">{data.caedec}</p>
                <p className="mb-0">{data.correo}</p>
                <p className="mb-0 text-warning">13/06/2023 15:45:00</p>
                <p className="mb-0 text-danger">13/06/2023 15:45:00</p>
              </div>
              <div className="col-1">
                <FaCommentDots  onClick={handleComentario}/>
                <FaEye />
                <FaPrint />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header  className="bg-black text-white" closeButton>
          <Modal.Title>Datos del funcionario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>   
        </Modal.Footer>
      </Modal>
    </>
  );
};

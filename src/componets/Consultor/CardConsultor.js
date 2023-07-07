import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaCheck, FaCommentDots, FaEye, FaPrint, FaTimes, FaUser } from "react-icons/fa";
import { useSolicitud } from "../../context/SolicitudContext";

function formatFechaHora(fecha) {
  const date = new Date(fecha);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export const CardConsultor = ({ soli, funcionario }) => {
  const [show, setShow] = useState(false);
  const [showFuncionario, setShowFuncionario] = useState(false);
  const handleClose = () => setShow(false);
  const {
    aceptarSolicitud,
    rechazarSolicitud,
  } = useSolicitud();

  const handleShow = () => {
    //console.log(funcionario);
    setShow(true);
  };

  const handleComentario = () => {};
  const handleAceptarSolicitud = () =>  aceptarSolicitud(soli.codigo_solicitud);
  const handleRechazarSolicitud = () =>  rechazarSolicitud(soli.codigo_solicitud);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div
                className={`col-1 ${
                  soli.estado === "ACEPTADO"
                    ? "bg-success"
                    : soli.estado === "GERENCIA"
                    ? "bg-info"
                    : soli.estado === "RECHAZADO"
                    ? "bg-danger"
                    : "bg-warning"
                }`}
              ></div>
              <div className="col-9">
                <p className="mb-0">{soli.codigo_solicitud}</p>
                <p className="mb-0">{soli.numero_doc + " - " + soli.nombre}</p>
                <p className="mb-0">{soli.producto}</p>
                <p className="mb-0">{soli.cod_caedec + " - " + soli.caedec}</p>
                <p className="mb-0">{soli.correo_usuario_uif}</p>
                <p className="mb-0">{formatFechaHora(soli.fecha_registro)}</p>
                {soli.estado !== "PENDIENTE" ? (
                  <p className="mb-0">13/06/2023 15:45:00</p>
                ) : (
                  <div></div>
                )}
              </div>
              {soli.estado !== "PENDIENTE" ? (
                <div className="col-2">
                  <FaCommentDots className="m-1" onClick={handleComentario} />
                  <FaEye className="m-1"/>
                  <FaPrint />
                </div>
              ) : (
                <div className="col-1">
                  <FaCheck className="m-2" onClick={handleAceptarSolicitud} />
                  <FaTimes onClick={handleRechazarSolicitud}/>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bg-black text-white" closeButton>
          <Modal.Title>Datos del funcionario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{funcionario.nombre}</p>
          <p>{funcionario.correo}</p>
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

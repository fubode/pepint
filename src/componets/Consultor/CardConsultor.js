import React, {useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  FaCheck,
  FaCommentDots,
  FaEye,
  FaPrint,
  FaTimes,
  FaUser,
} from "react-icons/fa";
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
  const [showAceptar, setShowAceptar] = useState(false);
  const [showFuncionario, setShowFuncionario] = useState(false);
  const [showRechazar, setShowRechazar] = useState(false);
  const [showComentario, setShowComentario] = useState(false)
  const handleClose = () => {
    setShowFuncionario(false);
    setShowAceptar(false);
    setShow(false);
    setShowRechazar(false);
    setShowComentario(false);
  };
  const [textareaValue, setTextareaValue] = useState('');

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };
  const { modificarSolicitud, rol } = useSolicitud();

  const handleShow = () => {
    //console.log(funcionario);
    setShow(true);
  };

  const handleAceptar = () => setShowAceptar(!showAceptar);
  const handleRechazar = () => setShowRechazar(!showRechazar);

  const handleShowUsuario = () => setShowFuncionario(!showFuncionario);
  const handleComentario = () => setShowComentario(!showComentario);
  const handleAceptarSolicitud = () => {
    const detalle = 'Realizada la debida diligencia no se tienen observaciones para realizar la operacion comercial';
    modificarSolicitud(soli.codigo_solicitud,detalle,'ACEPTADO');
    setShowAceptar(!showAceptar);
  };
  const handleRechazarSolicitud = () =>{
    modificarSolicitud(soli.codigo_solicitud,textareaValue,'RECHAZADO');
    setShowRechazar(!showRechazar);
  }

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
              >
                <FaUser onClick={handleShowUsuario} />
              </div>
              <div className="col-9">
                <p className="mb-0">{soli.codigo_solicitud}</p>
                <p className="mb-0">{soli.numero_doc + " - " + soli.nombre}</p>
                <p className="mb-0">{soli.producto}</p>
                <p className="mb-0">{soli.cod_caedec + " - " + soli.caedec}</p>
                <p className="mb-0">{formatFechaHora(soli.created_at)}</p>

                {soli.estado === "PENDIENTE" ? (
                  <div>
                    <p className="mb-0">{soli.correo_usuario_uif}</p>
                  </div>
                ) : soli.estado === "ACEPTADO" ? (
                  <div>
                    <p className="mb-0 text-success">
                      {formatFechaHora(soli.fecha_modificacion)}
                    </p>
                    <p className="mb-0 text-success">{soli.correo_final}</p>
                  </div>
                ) : soli.estado === "RECHAZADO" ? (
                  <div>
                    <p className="mb-0 text-danger">
                      {formatFechaHora(soli.fecha_modificacion)}
                    </p>
                    <p className="mb-0 text-danger">{soli.correo_final}</p>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              {soli.estado !== "PENDIENTE" ? (
                <div className="col-2">
                  <FaCommentDots className="m-1" onClick={handleComentario} />
                  <FaEye className="m-1" />
                  <FaPrint />
                </div>
              ) : rol === 7 ? (
                <div className="col-1">
                  <FaCheck className="m-2" onClick={handleAceptar} />
                  <FaTimes onClick={handleRechazar} />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal show={showFuncionario} onHide={handleClose}>
        <Modal.Header className="bg-black text-white" closeButton>
          <Modal.Title>Datos del funcionario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{"FUNCIONARIO: " + soli.nombre_completo}</p>
          <p>{"CORREO: " + soli.correo}</p>
          <p>{"AGENCIA: " + soli.nombre_agencia}</p>
          <p>{"CARGO: " + soli.nombre_cargo}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAceptar} onHide={handleClose}>
        <Modal.Header className="bg-black text-white" closeButton>
          <Modal.Title>ACEPTAR SOLICITUD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{"Realizada la debida diligencia no se tienen observaciones para realizar la operacion comercial"}</p>
          <p>{"Esta seguro de aceptar la solicitud?"}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAceptarSolicitud}>
            ACEPTAR
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRechazar} onHide={handleClose}>
        <Modal.Header className="bg-black text-white" closeButton>
          <Modal.Title>RECHAZAR SOLICITUD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <textarea 
            style={{ width: "100%" }}
            rows="4" 
            placeholder="Ingrese comentario"
            onChange={handleTextareaChange}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRechazarSolicitud}>
            RECHAZAR
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showComentario} onHide={handleClose}>
        <Modal.Header className="bg-black text-white" closeButton>
          <Modal.Title>SOLICITUD ACEPTADA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{soli.descripcion}</p>
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

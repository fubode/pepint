import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import {
  FaCheck,
  FaCommentDots,
  FaEye,
  FaPrint,
  FaTimes,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";
import { useSolicitud } from "../../context/SolicitudContext";
import CustomModal from "../CustomModal ";

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
  const [showComentario, setShowComentario] = useState(false);
  const [showEnviar, setShowEnviar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => {
    setShowFuncionario(false);
    setShowAceptar(false);
    setShow(false);
    setShowRechazar(false);
    setShowComentario(false);
    setShowEnviar(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const [textareaValue, setTextareaValue] = useState("");
  const [textDestino, setTextDestino] = useState("NINGUNO");
  const [textGerencia, setTextGerencia] = useState("");

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };
  const { modificarSolicitud, rol, correos, enviarSolicitudGerecia } =
    useSolicitud();

  const handleAceptar = () => setShowAceptar(!showAceptar);
  const handleRechazar = () => setShowRechazar(!showRechazar);

  const handleShowUsuario = () => setShowFuncionario(!showFuncionario);
  const handleComentario = () => setShowComentario(!showComentario);
  const handleAceptarSolicitud = () => {
    const detalle =
      "Realizada la debida diligencia no se tienen observaciones para realizar la operacion comercial";
    modificarSolicitud(soli.codigo_solicitud, detalle, "ACEPTADO");
    setShowAceptar(false);
  };
  const handleRechazarSolicitud = () => {
    modificarSolicitud(soli.codigo_solicitud, textareaValue, "RECHAZADO");
    setShowRechazar(!showRechazar);
  };
  const handleDestino = (event) => {
    setTextDestino(event.target.value);
    console.log(event.target.value);
  };

  const handleEnviar = () => {
    setShowEnviar(true);
  };

  const handleTextareaGerencia = (event) => {
    setTextGerencia(event.target.value);
    console.log(event.target.value);
  };

  const handleSolicitudGerencia = () => {
    enviarSolicitudGerecia(
      soli.codigo_solicitud,
      textGerencia,
      textDestino,
      "GERENCIA"
    );
  };

  const handleVista = () => {
    setModalOpen(true);
  }
  return (
    <>

      <div className="container">
        <div className="card border">
          <div className="row">
            <div
              className={`col-1 d-flex align-items-center justify-content-center  ${soli.estado === "ACEPTADO"
                  ? "bg-success"
                  : soli.estado === "GERENCIA"
                    ? "bg-info"
                    : soli.estado === "RECHAZADO"
                      ? "bg-danger"
                      : "bg-warning"
                }`}
            >
              <div className="card-body">
                {rol === 7 ? (
                  <FaUser size={35} onClick={handleShowUsuario} />
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="col-10">
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
              ) : soli.estado === "GERENCIA" ? (
                <div>
                  <p className="mb-0 text-info">
                    {formatFechaHora(soli.fecha_modificacion)}
                  </p>
                  <p className="mb-0 text-info">{soli.correo_usuario_ag}</p>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="col-1 d-flex align-items-center justify-content-center">
              <div className="d-flex flex-column align-items-center">
                {soli.estado === "PENDIENTE" ? (
                  rol === 7 ? (
                    <div className="col-1">
                      <FaCheck className="mb-1" onClick={handleAceptar} />
                      <FaTimes onClick={handleRechazar} />
                      <FaEnvelope onClick={handleEnviar} />
                    </div>
                  ) : (
                    <></>
                  )
                ) : soli.estado === "ACEPTADO" ? (
                  <div className="col-1">
                    <FaCommentDots className="mb-1" onClick={handleComentario} />
                    <FaEye className="mb-1" onClick={handleVista} />
                    <FaPrint />
                  </div>
                ) : soli.estado === "RECHAZADO" ? (
                  <div className="col-1">
                    <FaCommentDots className="mb-1" onClick={handleComentario} />
                    <FaEye className="mb-1" onClick={handleVista} />
                    <FaPrint />
                  </div>
                ) : soli.estado === "GERENCIA" ? (
                  rol === 8 ? (
                    <div className="col-1">
                      <FaCheck className="mb-2" onClick={handleAceptar} />
                      <FaTimes onClick={handleRechazar} />
                      <FaCommentDots
                        className="mb-1"
                        onClick={handleComentario}
                      />
                    </div>
                  ) : (
                    <div className="col-1">
                      <FaCommentDots
                        className="mb-1"
                        onClick={handleComentario}
                      />
                    </div>
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        show={modalOpen}
        onHide={handleCloseModal}
        content="Contenido del modal"
        fecha={formatFechaHora(new Date)}
        soli ={soli}
        formatFechaHora ={formatFechaHora}
        />
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
        <Modal.Header className="bg-success text-white" closeButton>
          <Modal.Title>ACEPTAR SOLICITUD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {
              "Realizada la debida diligencia no se tienen observaciones para realizar la operacion comercial"
            }
          </p>
          <p>{"Esta seguro de aceptar la solicitud?"}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAceptarSolicitud}>
            ACEPTAR
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRechazar} onHide={handleClose}>
        <Modal.Header className="bg-danger text-white" closeButton>
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
          <Button variant="success" onClick={handleRechazarSolicitud}>
            RECHAZAR
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showComentario} onHide={handleClose}>
        <Modal.Header
          className={`text-white ${soli.estado === "ACEPTADO"
              ? "bg-success"
              : soli.estado === "GERENCIA"
                ? "bg-info"
                : soli.estado === "RECHAZADO"
                  ? "bg-danger"
                  : "bg-warning"
            }`}
          closeButton
        >
          <Modal.Title>{soli.estado}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{soli.descripcion}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEnviar} onHide={handleClose}>
        <Modal.Header className="bg-info text-white" closeButton>
          <Modal.Title>ENVIAR SOLICITUD A ALTA GERENCIA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <select
              className="form-select mb-2"
              aria-label="Default select example"
              onChange={handleDestino}
            >
              <option value="NINGUNO">Seleccione el destino</option>
              <option value="marko_avendano@fubode.org">
                marko_avendano@fubode.org
              </option>
              <option value="juan_montecinos@fubode.org">
                juan_montecinos@fubode.org
              </option>
              <option value="roberto_rios@fubode.org">
                mroberto_riosfubode.org
              </option>
            </select>
            <textarea
              style={{ width: "100%" }}
              rows="4"
              placeholder="Ingrese comentario"
              onChange={handleTextareaGerencia}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleSolicitudGerencia}>
            ENVIAR
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

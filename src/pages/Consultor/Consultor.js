import React, { Component, useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import { CardConsultor } from "../../componets/Consultor/CardConsultor";
import { Button, Modal } from "react-bootstrap";
import { useSolicitud } from "../../context/SolicitudContext";
import { TextAutoSugerenias } from "../../componets/Consultor/TextAutoSugerenias";
import { useNavigate } from "react-router-dom";

export const Consultor = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showMessage, setShowMesagge] = useState(false);

  const {
    solicitudes,
    createSolicitudes,
    getCaedec,
    caedecSeleccionado,
    setCaedecSeleccionado,
    getFuncionario,
    funcionario,
    getSolicitudes,
    navegacion
  } = useSolicitud();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSalir = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/login");
  };

  const handleEjemplo = () => {
    console.log(funcionario);
  };

  const handleCloseMessage = () => setShowMesagge(false);

  useEffect(() => {
    getFuncionario();
    navegacion();
    getCaedec();
    getSolicitudes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const numero_doc = e.target[0].value;
    const nombre_completo = e.target[1].value;
    const producto = e.target[2].value;
    const tipo = e.target[4].value;
    setShow(false);
    const solicitud = {
      tipo: textTipo,
      descripcion: "NINGUNO",
      numero_doc: textCI,
      nombre_completo: textNombre,
      producto: textProducto,
      cod_caedec: caedecSeleccionado.cod_caedec,
      estado: "PENDIENTE",
    };
    setCaedecSeleccionado({});
    createSolicitudes(solicitud);
    setShowMesagge(true);
    setCaedecSeleccionado({});
  };

  return (
    <>
      <div>
        <NavFubode />
        <div className="container-fluid h-100">
          <div className="row w-100 align-items-center">
            <div className="col text-center">
              <button
                className="btn btn-warning regular-button"
                onClick={handleShow}
              >
                Nueva solicitud
              </button>
            </div>
          </div>
        </div>
        <div></div>
        <div className="container d-flex justify-content-center align-items-center h-100">
          <div className="row m-1">
            {solicitudes.map((soli, key) => (
              <CardConsultor soli={soli} funcionario={funcionario} key={key} />
            ))}
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-warning text-center">
          <Modal.Title>NUEVA SOLICITUD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Cedula de identidad</label>
              <div className="mb-3">
                <div className="col-12">
                  <input
                    type="number"
                    className="form-control"
                    id="ci"
                    name="ci"
                    placeholder="Introduzca su nro de ci"
                    onChange={handleTextCi}
                  />
                  {!validacionCi ? (
                    <p className="text-danger">
                      El ci debe tener mas de 5 digitos
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label text-uppercase"
              >
                Nombre completo
              </label>
              <input
                type="text"
                className="form-control text-uppercase"
                id="exampleInputPassword1"
                onChange={handleNombre}
              />
              {!validacionNombre ? (
                <p className="text-danger">El nombre no puede estar vacio</p>
              ) : (
                <></>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Producto
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={handleProducto}
              >
                <option value="NINGUNO">Selecciones un producto</option>
                <option value="CAJA DE AHORRO">CAJA DE AHORRO</option>
                <option value="DEPOSITO A PLAZO FIJO">
                  DEPOSITO A PLAZO FIJO
                </option>
                <option value="BANCA COMUNAL">BANCA COMUNAL</option>
                <option value="CREDITO INDIVIDUAL">CREDITO INDIVIDUAL</option>
              </select>
              {!validacionProducto ? (
                <p className="text-danger">Debe seleccionar un producto</p>
              ) : (
                <></>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">CAEDEC</label>
              <TextAutoSugerenias></TextAutoSugerenias>
              {!validacionCaedec ? (
                <p className="text-danger">Debe introducir un caedec</p>
              ) : (
                <></>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Tipo
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={handleTipo}
              >
                <option value="NINGUNO">Selecciones un tipo</option>
                <option value="INT">INT</option>
                <option value="PEP">PEP</option>
                <option value="CAEDEC">CAEDEC</option>
              </select>
              {!validacionTipo ? (
                <p className="text-danger">Debe seleccionar un tipo</p>
              ) : (
                <></>
              )}
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Enviar solicitud
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={showMessage} onHide={handleCloseMessage}>
        <Modal.Header closeButton>
          <Modal.Title>SOLICITUD ENVIADA</Modal.Title>
        </Modal.Header>
        <Modal.Body>Se envio la solicitud</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMessage}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

import React, { Component, useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import { NavFubode } from "../../componets/NavFubode";
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
    getSolicitudes,
    loading,
    createSolicitudes,
    getCaedec,
    caedec,
    caedecSeleccionado,
    setCaedecSeleccionado,
    getUsuarioIFD,
    getFuncionario,
    funcionario,
  } = useSolicitud();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSalir = async () => {
    const { error } = await supabase.auth.signOut();
    if(error) throw error
    navigate("/login");
  };

  const handleEjemplo = () => {
    
    getFuncionario()

    console.log(funcionario);
  };

  const handleCloseMessage = () => setShowMesagge(false);

  useEffect(() => {
    getSolicitudes();
    getCaedec();
    getFuncionario();
    console.log(solicitudes);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const numero_doc = e.target[0].value;
    const nombre_completo = e.target[1].value;
    const producto = e.target[2].value;
    const tipo = e.target[4].value;
    setShow(false);
    const solicitud = {
      tipo: tipo,
      descripcion: "NINGUNO",
      numero_doc: numero_doc,
      nombre_completo: nombre_completo,
      producto: producto,
      cod_caedec: caedecSeleccionado.cod_caedec,
      estado: "PENDIENTE",
    };
    setCaedecSeleccionado({});
    createSolicitudes(solicitud);
    setShowMesagge(true);
    console.log(solicitudes);
  };

  return (
    <>
      <div>
        <NavFubode />
        <Button onClick={handleEjemplo}>ejemplo</Button>
        <Button onClick={handleSalir}>SALIR</Button>
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
              //<h1 key={key}>{soli.producto}</h1>
              <CardConsultor soli={soli} funcionario = {funcionario} key={key} />
            ))}
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-warning text-center">
          <Modal.Title>NUEVA SOLICITUD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
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
                  />
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
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Producto
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option value="NINGUNO">Selecciones un producto</option>
                <option value="CAJA DE AHORRO">CAJA DE AHORRO</option>
                <option value="DEPOSITO A PLAZO FIJO">
                  DEPOSITO A PLAZO FIJO
                </option>
                <option value="BANCA COMUNAL">BANCA COMUNAL</option>
                <option value="CREDITO INDIVIDUAL">CREDITO INDIVIDUAL</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">CAEDEC</label>
              <TextAutoSugerenias></TextAutoSugerenias>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Tipo
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option value="NINGUNO">Selecciones un tipo</option>
                <option value="INT">INT</option>
                <option value="PEP">PEP</option>
                <option value="CAEDEC">CAEDEC</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
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

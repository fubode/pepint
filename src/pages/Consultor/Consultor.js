import React, { useEffect, useState } from "react";
import { NavFubode } from "../../componets/NavFubode";
import { CardConsultor } from "../../componets/Consultor/CardConsultor";
import Modal from "react-bootstrap/Modal";
import { useSolicitud } from "../../context/SolicitudContext";

export const Consultor = () => {
  const [show, setShow] = useState(false);
  const { solicitudes, getSolicitudes,loading,createSolicitudes } = useSolicitud();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getSolicitudes();
  }, []);

  const handleSubmit = (e)=>{
    e.preventDefault();
    const ci = e.target[1].value;
    const extencion = e.target[0].value;
    const nombre = e.target[2].value;
    const producto = e.target[3].value;
    const caedecNro = e.target[4].value;
    const caedecDesc = e.target[5].value;
    const tipo = e.target[6].value;
    
    createSolicitudes(ci,extencion,nombre,producto,caedecDesc,caedecNro,tipo);
  }

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
        <div className="container d-flex justify-content-center align-items-center h-100">
          <div className="row m-1">
            {solicitudes.map((data) => (
              <div className="col-md-4">
                <CardConsultor data={data} key={data.id} />
              </div>
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
                <div className="row">
                  <div className="col-3">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="AA">Ext</option>
                      <option value="CB">CB</option>
                      <option value="LP">LP</option>
                      <option value="CH">CH</option>
                      <option value="OR">OR</option>
                      <option value="TJ">TJ</option>
                      <option value="BE">BE</option>
                      <option value="SC">SC</option>
                      <option value="PA">PA</option>
                    </select>
                  </div>
                  <div className="col-9 ci">
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
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label text-uppercase">
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
              <select className="form-select" aria-label="Default select example">
                <option value="NINGUNO">Selecciones un producto</option>
                <option value="CAJA DE AHORRO">CAJA DE AHORRO</option>
                <option value="DEPOSITO A PLAZO FIJO">DEPOSITO A PLAZO FIJO</option>
                <option value="BANCA COMUNAL">BANCA COMUNAL</option>
                <option value="CREDITO INDIVIDUAL">CREDITO INDIVIDUAL</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">CAEDEC</label>
              <div className="mb-3">
                <div className="row">
                  <div className="col-3">
                    <input
                      type="number"
                      className="form-control text-uppercase"
                      id="exampleFormControlInput1"
                    />
                  </div>
                  <div className="col-9">
                    <input
                      type="text"
                      className="form-control text-uppercase"
                      id="exampleFormControlInput1"
                      placeholder="CAEDEC"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Tipo
              </label>
              <select className="form-select" aria-label="Default select example">
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
    </>
  );
};

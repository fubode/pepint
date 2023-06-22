import React, { useState } from "react";
import { NavFubode } from "../../componets/NavFubode";
import { CardConsultor } from "../../componets/Consultor/CardConsultor";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
export const Consultor = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const cards = [
    {
      id: 1,
      codigo: "MTV-PEP-01",
      ci: "8770694",
      producto: "CAPTACIONES",
      area: "APERTURA DE CAJA DE AHORRO",
      usuario: {
        nombre: "moises vargas torres",
        agencia: "cochabamba",
        correo: "moises_vargas@fubode.org",
      },
    },
    {
      id: 2,
      codigo: "MTV-PEP-014",
      ci: "8770694",
      producto: "CAPTACIONES",
      area: "APERTURA DE CAJA DE AHORRO",
      usuario: {
        nombre: "moises vargas torres",
        agencia: "cochabamba",
        correo: "moises_vargas@fubode.org",
      },
    },
    {
      id: 3,
      codigo: "MTV-PEP-012",
      ci: "8770694",
      producto: "CAPTACIONES",
      area: "APERTURA DE CAJA DE AHORRO",
      usuario: {
        nombre: "moises vargas torres",
        agencia: "cochabamba",
        correo: "moises_vargas@fubode.org",
      },
    },
    {
      id: 4,
      codigo: "MTV-PEP-03",
      ci: "8770694",
      producto: "CAPTACIONES",
      area: "APERTURA DE CAJA DE AHORRO",
      usuario: {
        nombre: "moises vargas torres",
        agencia: "cochabamba",
        correo: "moises_vargas@fubode.org",
      },
    },
  ];

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
            {cards.map((data) => (
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
          <form>
            <div classname="mb-3">
              <div class="row">
                <div class="col-3">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Ext</option>
                    <option value="1">CB</option>
                    <option value="2">OR</option>
                    <option value="3">PT</option>
                  </select>
                </div>
                <div class="col-9">
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Introduzca su nro de ci"
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Nombre completo
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div classname="mb-3">
              <div class="row">
                <div class="col-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    AREA
                  </label>
                </div>
                <div class="col-9">
                <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
                </div>
              </div>
            </div>
            <div classname="mb-3">
              <div class="row">
                <div class="col-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    PRODUCTO
                  </label>
                </div>
                <div class="col-9">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Area</option>
                    <option value="1">CB</option>
                    <option value="2">OR</option>
                    <option value="3">PT</option>
                  </select>
                </div>
              </div>
            </div>

            <div classname="mb-3">
              <div class="row">
                <div class="col-3">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Ext</option>
                    <option value="1">CB</option>
                    <option value="2">OR</option>
                    <option value="3">PT</option>
                  </select>
                </div>
                <div class="col-9">
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Introduzca su nro de ci"
                  />
                </div>
              </div>
            </div>

            <div classname="mb-3">
              <div class="row">
                <div class="col-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    TIPO
                  </label>
                </div>
                <div class="col-9">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Area</option>
                    <option value="1">PEP</option>
                    <option value="2">INT</option>
                    <option value="3">CAEDEC</option>
                  </select>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

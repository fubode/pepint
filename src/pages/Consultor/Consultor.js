import React, { useEffect, useState } from "react";
import { NavFubode } from "../../componets/NavFubode";
import { CardConsultor } from "../../componets/Consultor/CardConsultor";
import { Button, Modal } from "react-bootstrap";
import { useSolicitud } from "../../context/SolicitudContext";
import Autosuggest from "react-autosuggest";

const data = [
  { pais: "Brasil", presidente: "Jair Messias Bolsonaro" },
  { pais: "México", presidente: "Andrés Manuel López Obrador" },
  { pais: "Argentina", presidente: "Alberto Ángel Fernández" },
  { pais: "Colombia", presidente: "Iván Duque Márquez" },
  { pais: "Chile", presidente: "Gabriel Boric Font" },
  { pais: "Perú", presidente: "José Pedro Castillo Terrones" },
  { pais: "Ecuador", presidente: "Guillermo Alberto Santiago Lasso Mendoza" },
  {
    pais: "República Dominicana",
    presidente: "Luis Rodolfo Abinader Corona",
  },
  { pais: "Guatemala", presidente: "Alejandro Eduardo Giammattei Falla" },
  { pais: "Costa Rica", presidente: "Carlos Andrés Alvarado Quesada" },
];



export const Consultor = () => {
  const [show, setShow] = useState(false);
  const [showMessage, setShowMesagge] = useState(false);
  const {
    solicitudes,
    getSolicitudes,
    loading,
    createSolicitudes,
    getCaedec,
    caedec,
  } = useSolicitud();

  const [infoCaedec, setInfoCaedec] = useState(caedec);
  const [value, setValue] = useState("");
  const [caedecSeleccionado, setCaedecSeleccionado] = useState({});

  

  const onSuggestionsFetchRequested = ({ value }) => {
    setInfoCaedec(filtrarPresidentes(value));
  };

  const filtrarPresidentes = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    var filtrado = caedec.filter((info) => {
      var textoCompleto = info.cod_caedec + " - " + info.caedec;

      if (
        textoCompleto
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(inputValue)
      ) {
        return info;
      }
    });

    return inputLength === 0 ? [] : filtrado;
  };

  const onSuggestionsClearRequested = () => {
    setInfoCaedec([]);
  };

  const getSuggestionValue = (suggestion) => {
    return `${suggestion.cod_caedec} - ${suggestion.caedec}`;
  };

  const renderSuggestion = (suggestion) => (
    <div
      className="sugerencia"
      onClick={() => seleccionarPresidente(suggestion)}
    >
      {`${suggestion.cod_caedec} - ${suggestion.caedec}`}
    </div>
  );

  const seleccionarPresidente = (presidente) => {
    console.log(caedecSeleccionado);
    console.log(presidente);
    setCaedecSeleccionado(presidente);
    console.log(caedecSeleccionado);
  };

  const onChange = (e, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "País o Nombre del Presidente",
    value,
    onChange,
  };

  const eventEnter = (e) => {
    if (e.key == "Enter") {
      var split = e.target.value.split("-");
      var presidente = {
        cod_caedec: split[0].trim(),
        caedec: split[1].trim(),
      };
      seleccionarPresidente(presidente);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseMessage = () => setShowMesagge(false);

  useEffect(() => {
    getSolicitudes();
    getCaedec();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const numero_doc = e.target[1].value;
    const extencion = e.target[0].value;
    const nombre_completo = e.target[2].value;
    const producto = e.target[3].value;
    const cod_caedec = e.target[4].value;
    const caedecDesc = e.target[5].value;
    const tipo = e.target[6].value;

    setShow(false);
    console.log(cod_caedec, tipo, numero_doc, nombre_completo, producto,caedecSeleccionado.cod_caedec,extencion);
    //createSolicitudes(cod_caedec, tipo, numero_doc, nombre_completo, producto);
    setShowMesagge(true);
    e.target[0].value="";
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
            <Autosuggest
              suggestions={infoCaedec}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              onSuggestionSelected={eventEnter}
              
            />
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

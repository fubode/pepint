import React, { useEffect, useState } from "react";
import { CardConsultor } from "../../componets/Consultor/CardConsultor";
import { Button, Modal } from "react-bootstrap";
import { useSolicitud } from "../../context/SolicitudContext";
import { TextAutoSugerenias } from "../../componets/Consultor/TextAutoSugerenias";
import Paginacion from "../../componets/Paginacion";
import NavFubode from "../../componets/NavFubode";
import Recargar from "../../componets/Consultor/Recargar";
import { supabase } from "../../supabase/client";

export const Consultor = () => {
  const [show, setShow] = useState(false);
  const [showMessage, setShowMesagge] = useState(false);
  const [textCI, setTextCI] = useState("");
  const [textNombre, setNombre] = useState("");
  const [textProducto, setProducto] = useState("NINGUNO");
  const [textTipo, setTipo] = useState("NINGUNO");
  const [validacion, setValidacion] = useState({
    ci: true,
    nombre: true,
    tipo: true,
    producto: true,
    caedec: true,
  });

  const {
    solicitudes,
    createSolicitudes,
    getCaedec,
    caedecSeleccionado,
    setCaedecSeleccionado,
    getFuncionario,
    funcionario,
    getSolicitudes,
    navegacion,
  } = useSolicitud();

  const handleClose = () => {
    setShow(false);
    setTextCI("");
    setNombre("");
    setProducto("");
    setTipo("");
    setValidacion({
      ci: true,
      nombre: true,
      tipo: true,
      producto: true,
      caedec: true,
    });
  };

  const handleShow = () => setShow(true);

  const handleTextCi = (event) => {
    setTextCI(event.target.value);
    console.log(event.target.value);
  };
  const handleNombre = (event) => {
    setNombre(event.target.value);
    console.log(event.target.value);
  };
  const handleTipo = (event) => {
    setTipo(event.target.value);
    console.log(event.target.value);
  };

  const handleProducto = (event) => {
    setProducto(event.target.value);
    console.log(event.target.value);
  };
  const handleCloseMessage = () => setShowMesagge(false);

  useEffect(() => {
    getFuncionario();
    navegacion();
    getCaedec();
    getSolicitudes();
  }, []);

  const handleSubmit = () => {
    // Validar campos
    const validaciones = {
      ci:textCI.toString().length >= 5,
      nombre: textNombre.trim() !== "",
      tipo: textTipo !== "NINGUNO",
      producto: textProducto !== "NINGUNO",
      caedec: Object.keys(caedecSeleccionado).length > 0,
    };

    setValidacion(validaciones);

    // Verificar si todos los campos son válidos
    const camposValidos = Object.values(validaciones).every(
      (validacion) => validacion
    );

    if (camposValidos) {
      console.log(
        textCI,
        textNombre,
        textProducto,
        textTipo,
        caedecSeleccionado
      );

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
      console.log(solicitudes);
      
    }
  };

  const handleRegistrar = async () => {
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(
      "juan_montecinos@fubode.org"
    );
    console.log(data, error);
    //enviarCorreo("juan_montecinos@fubode.org", "PRUEBA REACT", "funciono");
  };

  return (
    <>
      <div>
        <button
          className="btn btn-primary btn-lg btn-block d-none"
          onClick={handleRegistrar}
        >
          Registrar usuarios
        </button>
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
              <Recargar></Recargar>
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
      <Paginacion />
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
                    type="text"
                    className={`form-control ${
                      !validacion.ci ? "is-invalid" : ""
                    }`}
                    id="ci"
                    name="ci"
                    placeholder="Introduzca su nro de ci"
                    onChange={handleTextCi}
                  />
                  {!validacion.ci && (
                    <div className="invalid-feedback">
                      El número de CI debe ser numérico y tener al menos 5
                      dígitos.
                    </div>
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
                className={`form-control text-uppercase ${
                  !validacion.nombre ? "is-invalid" : ""
                }`}
                id="exampleInputPassword1"
                onChange={handleNombre}
              />
              {!validacion.nombre && (
                <div className="invalid-feedback">
                  El nombre completo es obligatorio.
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Producto
              </label>
              <select
                className={`form-select ${
                  !validacion.producto ? "is-invalid" : ""
                }`}
                aria-label="Default select example"
                onChange={handleProducto}
              >
                <option value="NINGUNO">Selecciones un producto</option>
                <option value="CAJA DE AHORRO">CAJA DE AHORRO</option>
                <option value="DEPOSITO A PLAZO FIJO">
                  DEPOSITO A PLAZO FIJO
                </option>
                <option value="BANCA COMUNAL">BANCA COMUNAL</option>
                <option value="PROVEEDOR">PROVEEDOR</option>
                <option value="CLIENTE INTERNO">CLIENTE INTERNO</option>
                <option value="CREDITO INDIVIDUAL">CREDITO INDIVIDUAL</option>
              </select>
              {!validacion.producto && (
                <div className="invalid-feedback">
                  Seleccione un producto válido.
                </div>
              )}
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
                className={`form-select ${
                  !validacion.tipo ? "is-invalid" : ""
                }`}
                aria-label="Default select example"
                onChange={handleTipo}
              >
                <option value="NINGUNO">Selecciones un tipo</option>
                <option value="INT">INT</option>
                <option value="PEP">PEP</option>
                <option value="CAEDEC">CAEDEC</option>
              </select>
              {!validacion.tipo && (
                <div className="invalid-feedback">
                  Seleccione un tipo válido.
                </div>
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

import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useSolicitud } from "../context/SolicitudContext";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import NavFubode from "../componets/NavFubode";
import CustomModal from "../componets/CustomModal ";
const Login = () => {
  const { getFuncionario, funcionario, navegacion, setRol } = useSolicitud();
  const EMISOR = "fubode.vacaciones@gmail.com";
  const CONTRASENA = "fpooxdsoatymykzn";
  const ENDPOINT_CORREO = "http://192.168.10.6:8096/correo"; // IP público

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const em = e.target.email.value + "@fubode.org";
    const pas = e.target.password.value;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: em,
        password: pas,
      });

      if (error) {
        setShow(!show);
        throw error.message;
      }
      getFuncionario();
      //navegacion();
    } catch (error) {
      setShow(!show);
      console.log(error);
    }
  };

  const handleRegistrar = async () => {
    /*const { data, error } = await supabase.auth.signUp({
      email: "doris_sagardia@fubode.org",
      password: "fubode123*",
    });
    console.log(data, error);*/
    const correo_solicitud = 'unidad_cumplimiento@fubode.org'
    const limit_value = 3;
    const offset_value = 0;
    let { data, error } = await supabase.rpc("solicitudes_correo", {
      correo_solicitud,
      limit_value,
      offset_value,
    });

    if (error) console.error(error);
    else console.log(data);
    //enviarCorreo("juan_montecinos@fubode.org", "PRUEBA REACT", "funciono");
  };

  const enviarCorreo = async (remitente, asunto, detalle) => {
    const data = {
      emisor: EMISOR,
      contrasenaEmisor: CONTRASENA,
      remitente: remitente,
      asunto: asunto,
      detalle: detalle,
    };

    let mensaje = "";

    try {
      await axios.post(ENDPOINT_CORREO, data);
      // Haz algo con la respuesta del servidor
      mensaje = "Correo enviado";

      // Ejemplo de navegación a otra página después de enviar el correo
    } catch (error) {
      mensaje = `Correo no enviado, ${error.message}`;
    }

    console.log(mensaje);
  };
  useEffect(() => {
    //console.log(supabase.auth.getSession());
    if (supabase.auth.getUser()) {
      console.log("login - login");
      navigate("/");
    } else {
      console.log("login - home");
      navigate("/consultor");
    }
  }, [navigate]);

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div>
        <NavFubode />
        <form onSubmit={handleSubmit}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card shadow-2-strong"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="card-body p-5 text-center">
                    <h3 className="mb-5">INGRESAR</h3>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        name="email"
                        placeholder="fubode_ifd"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="typeEmailX-2">
                        Email
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="typePasswordX-2"
                        name="password"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="typePasswordX-2">
                        Password
                      </label>
                    </div>
                    <button className="btn btn-primary btn-lg btn-block">
                      INGRESAR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <button
          className="btn btn-primary btn-lg btn-block"
          onClick={handleRegistrar}
        >
          Registrar usuarios
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ERROR!</Modal.Title>
        </Modal.Header>
        <Modal.Body>El usuario o la contraseña son incorrectos</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <button onClick={handleOpenModal}>Abrir modal</button>
      <CustomModal show={modalOpen} onHide={handleCloseModal} content="Contenido del modal" />
    </>
  );
};

export default Login;

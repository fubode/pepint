import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useSolicitud } from "../context/SolicitudContext";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import NavFubode from "../componets/NavFubode";
const Login = () => {
  const { getFuncionario} = useSolicitud();

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const em = e.target.email.value + "@fubode.org";
    const pas = e.target.password.value;
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: em,
        password: pas,
      });

      if (error) {
        setShow(!show);
        throw error.message;
      }
      getFuncionario();
    } catch (error) {
      setShow(!show);
      console.log(error);
    }
  };

  const handleRegistrar = async () => {
    enviarCorreo("juan_montecinos@fubode.org","REACT","Pruebas de react");
  };

  
const enviarCorreo = async (remitente, asunto, detalle) => {
  const EMISOR = "fubode.vacaciones@gmail.com";
  const CONTRASENA = "fpooxdsoatymykzn";
  const ENDPOINTCORREO = "http://192.168.10.6:8096/correo";

  try {
    const endpointCorreo = ENDPOINTCORREO; // Reemplaza con la URL del endpoint correspondiente

    const json = {
      emisor: EMISOR,
      contrasenaEmisor: CONTRASENA,
      remitente,
      asunto,
      detalle,
    };

    const response = await axios.post(endpointCorreo, json);
    // Haz algo con la respuesta del servidor, si es necesario
    return 'Correo enviado';
  } catch (error) {
    // Maneja el error en caso de que la solicitud falle
    return `Correo no enviado: ${error.message}`;
  }
};

  useEffect(() => {
    if (supabase.auth.getUser()) {
      console.log("login - login");
      navigate("/");
    } else {
      console.log("login - home");
      navigate("/consultor");
    }
  }, [navigate]);

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
          className="btn btn-primary btn-lg btn-block d-none"
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
    </>
  );
};

export default Login;

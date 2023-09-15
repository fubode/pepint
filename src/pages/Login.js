import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useSolicitud } from "../context/SolicitudContext";
import { Button, Modal } from "react-bootstrap";
import bcrypt from 'bcryptjs'; // Importa bcryptjs

import NavFubode from "../componets/NavFubode";

const Login = () => {
  const { getFuncionario, navegacion } = useSolicitud();

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [messageError, setMessageError] = useState("");
  const handleClose = () => setShow(false);


  const [captcha, setCaptcha] = useState('');
  const canvasRef = useRef(null);

  // Función para generar un captcha aleatorio
  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captchaText = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captchaText += characters[randomIndex];
    }
    return captchaText;
  };

  // Genera un nuevo captcha al cargar el componente
  useEffect(() => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    drawCaptcha(newCaptcha);
  }, []);

  // Función para dibujar el captcha en el canvas
  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.font = '30px Arial';
      context.fillText(text, 10, 30);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const em = e.target.email.value + "@fubode.org";
    const pas = e.target.password.value;
    const userCaptcha = e.target.captcha.value; // Obtén el valor ingresado por el usuario

    if (userCaptcha !== captcha) {
      setMessageError("capcha incorrecto");
      setShow(!show);
      const newCaptcha = generateCaptcha();
      setCaptcha(newCaptcha);
      drawCaptcha(newCaptcha);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: em,
        password: pas,
      });

      if (error) {
        setMessageError("El usuario o la contraseña son incorrectos");
        setShow(!show);
        throw error.message;
      }
      getFuncionario();
    } catch (error) {
      setMessageError(error);
      setShow(!show);
    }
  };

  const handleRegistrar = async () => {
    const bcryptPassword = bcrypt.hashSync("fubode123", 10);
    const nuevo_password = bcryptPassword;
    const vcorreo = 'pablo_bustamante@fubode.org';
    let { data, error } = await supabase
      .rpc('actualizar_password_correo', {
        nuevo_password,
        vcorreo
      });
    console.log(data, error);
    if (error) console.error(error);
    else console.log(data);
  };

  useEffect(() => {
    if (supabase.auth.getUser()) {
      navigate("/");
    } else {
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
                        Usuario
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
                        Contraseña
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <canvas ref={canvasRef} width="150" height="40"></canvas>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        name="captcha"
                        placeholder="Introduce el captcha"
                        id="typeCaptchaX"
                        className="form-control form-control-lg"
                      />
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
        <Modal.Body>{messageError}</Modal.Body>
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

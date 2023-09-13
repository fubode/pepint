import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useSolicitud } from "../context/SolicitudContext";
import { Button, Modal } from "react-bootstrap";
import bcrypt from 'bcryptjs'; // Importa bcryptjs

import NavFubode from "../componets/NavFubode";
const Login = () => {
  const { getFuncionario,navegacion } = useSolicitud();

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
/*    const { data, error } = await supabase.auth.admin.inviteUserByEmail(
      "juan_montecinos@fubode.org"
    );
    console.log(data, error)*/
    const bcryptPassword = bcrypt.hashSync("fubode1235", 10);
    console.log(bcryptPassword);
    //enviarCorreo("juan_montecinos@fubode.org","REACT527","Pruebas desde casa");
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
    </>
  );
};

export default Login;

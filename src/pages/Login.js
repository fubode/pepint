import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useSolicitud } from "../context/SolicitudContext";
import { NavFubode } from "../componets/NavFubode";
import { Button, Modal } from "react-bootstrap";
const Login = () => {
  const { getFuncionario, funcionario,navegacion,setRol } = useSolicitud();

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const em = e.target.email.value+'@fubode.org';
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
      navegacion();
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
    const roles = [
  { nombre_rol: 'Unidad de Cumplimiento', id_rol: 7 },
  { nombre_rol: 'Otro Rol', id_rol: 5 },
  { nombre_rol: 'Administrador', id_rol: 9 }
];

const rolesPermitidos = [6, 7, 8];

const encontrado = roles.find(rol => rolesPermitidos.includes(rol.id_rol));

if (encontrado) {
  const idRolEncontrado = encontrado.id_rol;
  console.log('Se encontró el id_rol:', idRolEncontrado);
} else {
  console.log('No se encontraron los roles en el arreglo');
}

  };

  useEffect(() => {
    //console.log(supabase.auth.getSession());
    if (supabase.auth.getUser()) {
      console.log("login - login");
      navigate("/login");
    } else {
      console.log("login - home");
      navigate("/consultor");
    }
  }, [navigate]);
  return (
    <>
      <div>
        <NavFubode />
        <hr className="my-4" />
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
                        placeholder="example@fubode.org"
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
    </>
  );
};

export default Login;

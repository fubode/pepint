import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { NavFubode } from "../componets/NavFubode";
import { Button, Modal } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const em = e.target.email.value;
    const pas = e.target.password.value;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: em,
        password: pas,
      });
      console.log(em, pas);
      console.log(data, error);
      console.log(supabase.auth.getUser());
      if (!supabase.auth.getUser()) {
        console.log("if");
      } else {
        console.log("else");
        setShow(!show);
      }
      console.log(data, error);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegistrar = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "201400076@est.umss.edu",
      password: "fubode123*",
    });
    console.log(data, error);
  };

  useEffect(() => {
    //console.log(supabase.auth.getSession());
    if (supabase.auth.getUser()) {
      console.log("login - login");
      navigate("/login");
    } else {
      console.log("login - home");
      navigate("/");
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
                        type="email"
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
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;

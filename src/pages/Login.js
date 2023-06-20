import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { NavFubode } from "../componets/NavFubode";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.email.value,e.target.password.value)
    const em = e.target.email.value;
    const pas = e.target.password.value;
    console.log(em,pas);
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: em,
            password: pas,
        });
        console.log(em,pas);
      console.log(supabase.auth.getUser());
      console.log(data, error);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (supabase.auth.getUser()) {
      navigate("/");
    }
  }, [navigate]);

  /*
    <input
          type="email"
          name="email"
          placeholder="example@fubode.org"
          id="typeEmailX-2"
          className="form-control form-control-lg"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="form-label" htmlFor="typeEmailX-2">
          Email
        </label>
        <button>Enviar</button>
    */
  return (
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
                  <h3 className="mb-5">Ingresar</h3>
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
    </div>
  );
};

export default Login;

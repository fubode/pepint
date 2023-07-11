import React, { useEffect } from "react";
import { NavFubode } from "../../componets/NavFubode";
import { useSolicitud } from "../../context/SolicitudContext";
import { CardConsultor } from "../../componets/Consultor/CardConsultor";
import { supabase } from "../../supabase/client";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Paginacion from "../../componets/Paginacion";

const Uif = () => {
  const navigate = useNavigate();
  const {
    solicitudesUIF,
    getFuncionario,
    funcionario,
    getSolicitudesUIF,
    getCorreosAltaGerencia,
    setRol,
  } = useSolicitud();
  const handleSalir = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setRol(0);
    navigate("/");
  };

  useEffect(() => {
    console.log("uif");
    getFuncionario();
    getSolicitudesUIF();
    getCorreosAltaGerencia();
  }, []);
  return (
    <>
      <NavFubode />
      <Button onClick={handleSalir}>SALIR</Button>
      <div className="container d-flex justify-content-center align-items-center h-100">
        <div className="row m-1">
          {solicitudesUIF.map((soli, key) => (
            //<h1 key={key}>{soli.producto}</h1>
            <CardConsultor soli={soli} funcionario={funcionario} key={key} />
          ))}
        </div>
      </div>
        <Paginacion className='m-4'/>
    </>
  );
};

export default Uif;

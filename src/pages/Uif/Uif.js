import React, { useEffect } from 'react'
import NavFubode from "../../componets/NavFubode";
import { useSolicitud } from '../../context/SolicitudContext';
import { CardConsultor } from '../../componets/Consultor/CardConsultor';
import { supabase } from "../../supabase/client";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Paginacion from '../../componets/Paginacion';
import Recargar from '../../componets/Consultor/Recargar';

const Uif = () => {

  const navigate = useNavigate();
  const {
    solicitudes,
    loading,
    createSolicitudes,
    getCaedec,
    caedec,
    caedecSeleccionado,
    setCaedecSeleccionado,
    getFuncionario,
    funcionario,
    getSolicitudesUIF,
    navegacion,
    getCorreos, correos
  } = useSolicitud();

  useEffect(() => {
    console.log("uif")
    getFuncionario();
    getCorreos();
    getSolicitudesUIF();
    console.log(correos);
  }, []);
  return (
    <>
      <NavFubode />
      <Recargar></Recargar>
      <div>
        {solicitudes.map((soli, key) => (
          <CardConsultor soli={soli} funcionario={funcionario} key={key} />
        ))}
      </div>
      <Paginacion />
    </>
  )
}

export default Uif
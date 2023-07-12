import React, { useEffect } from 'react'
import NavFubode from "../../componets/NavFubode";
import { useSolicitud } from '../../context/SolicitudContext';
import { CardConsultor } from '../../componets/Consultor/CardConsultor';
import { supabase } from "../../supabase/client";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Paginacion from '../../componets/Paginacion';

const Gerencia = () => {

  const navigate = useNavigate();
  const {
    solicitudesUIF,
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
    getCorreos, correos,
    solicitudesGerencia,
    getSolicitudesGerencia
  } = useSolicitud();

  useEffect(() => {
    console.log("uif")
    getFuncionario();
    getCorreos();
    getSolicitudesGerencia();
    console.log(correos);
  }, []);
  return (
    <>
      <NavFubode />
      <div>
        {solicitudesGerencia.map((soli, key) => (
          <CardConsultor soli={soli} funcionario={funcionario} key={key} />
        ))}
      </div>
    </>
  )
}

export default Gerencia
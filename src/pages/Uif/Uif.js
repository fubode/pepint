import React, { useEffect } from 'react'
import NavFubode from "../../componets/NavFubode";
import { useSolicitud } from '../../context/SolicitudContext';
import { CardConsultor } from '../../componets/Consultor/CardConsultor';
import Paginacion from '../../componets/Paginacion';
import Recargar from '../../componets/Consultor/Recargar';

const Uif = () => {

  const {
    solicitudes,
    getFuncionario,
    funcionario,
    getSolicitudesUIF,
    getCorreos
  } = useSolicitud();

  useEffect(() => {
    getFuncionario();
    getCorreos();
    getSolicitudesUIF();
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
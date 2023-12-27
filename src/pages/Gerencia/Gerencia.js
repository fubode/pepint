import React, { useEffect } from 'react'
import NavFubode from "../../componets/NavFubode";
import { useSolicitud } from '../../context/SolicitudContext';
import { CardConsultor } from '../../componets/Consultor/CardConsultor';
import Paginacion from '../../componets/Paginacion';
import Recargar from '../../componets/Consultor/Recargar';

const Gerencia = () => {

  const {
    getFuncionario,
    funcionario,
    getCorreos,
    solicitudes,
    getSolicitudesGerencia
  } = useSolicitud();

  useEffect(() => {
    getFuncionario();
    getCorreos();
    getSolicitudesGerencia();
  }, []);
  return (
    <>
      <NavFubode />
      <Recargar></Recargar>
      <div>
        {solicitudes.map((soli, key) => (
          <CardConsultor soli={soli} funcionario={funcionario} key={soli.codigo_solicitud} />
        ))}
      </div>
      <Paginacion />
    </>
  )
}

export default Gerencia
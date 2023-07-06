import React, { useEffect } from 'react'
import { NavFubode } from '../../componets/NavFubode'
import { useSolicitud } from '../../context/SolicitudContext';
import { CardConsultor } from '../../componets/Consultor/CardConsultor';

const Uif = () => {

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
    getSolicitudes,
  } = useSolicitud();
  
  useEffect(() => {
    getSolicitudes();
  }, []);
  return (
    <>
      <NavFubode/>
      <div className="container d-flex justify-content-center align-items-center h-100">
          <div className="row m-1">
            {solicitudes.map((soli, key) => (
              //<h1 key={key}>{soli.producto}</h1>
              <CardConsultor soli={soli} funcionario = {funcionario} key={key} />
            ))}
          </div>
        </div>
    </>
  )
}

export default Uif
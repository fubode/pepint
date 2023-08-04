import React from "react";
import {FaSyncAlt } from "react-icons/fa";
import { useSolicitud } from "../../context/SolicitudContext";

const Recargar = () => {
  const { rol, getSolicitudes, getSolicitudesUIF, getSolicitudesGerencia } = useSolicitud();

  const handleActualizar = () => {
    switch (rol) {
      case 6:
        getSolicitudes();
        break;
      case 7:
        getSolicitudesUIF();
        break;
      case 8:
        getSolicitudesGerencia();
        break;

      default:
        break;
    }
  }
  return (
    <div className="container d-flex justify-content-center align-items-center">
  <div className="d-inline-flex border rounded m-2">
    <FaSyncAlt className="m-2" onClick={handleActualizar} />
  </div>
</div>

    

  );
};

export default Recargar;

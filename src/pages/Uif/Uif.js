import React, { useEffect, useState } from "react";
import NavFubode from "../../componets/NavFubode";
import { useSolicitud } from "../../context/SolicitudContext";
import { CardConsultor } from "../../componets/Consultor/CardConsultor";
import Paginacion from "../../componets/Paginacion";
import Recargar from "../../componets/Consultor/Recargar";
import { useNavigate } from "react-router-dom";
import CardComponent from "./CardComponent ";
import SearchBar from "./SearchBar";
import DateSearchBar from "./DateSearchBar ";

const Uif = () => {
  const {
    solicitudes,
    getFuncionario,
    funcionario,
    getSolicitudesUIF,
    getCorreos,
    salir,
  } = useSolicitud();

  const navigate = useNavigate();

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");
    const currentDate = Date.now();
    if (expireTime < currentDate) {
      salir();
      //navigate("/");
    }
  };

  const updateExpireTime = () => {
    const expireTime = Date.now() + 900000;
    localStorage.setItem("expireTime", expireTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkForInactivity();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getFuncionario();
    getCorreos();
    getSolicitudesUIF();

    updateExpireTime();
    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);

    return () => {
      window.removeEventListener("click", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      window.removeEventListener("scroll", updateExpireTime);
      window.removeEventListener("mousemove", updateExpireTime);
    };
  }, []);
  const handleSearch = (query) => {
    console.log("Buscando:", query);
  };

  const handleDateSearch = (startDate, endDate) => {
    console.log("Imprimir reporte:", startDate, "hasta:", endDate);
  };
  return (
    <>
      <NavFubode />

      <Recargar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5 mx-auto justify-content-center">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="col-md-5 mx-auto">
            <DateSearchBar onDateSearch={handleDateSearch} />
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <CardComponent title="Pendientes" number="45" color="warning" />
          <CardComponent title="Aceptadas" number="10" color="success" />
          <CardComponent title="Rechazadas" number="0" color="danger" />
          <CardComponent title="Gerencia" number="0" color="info" />
        </div>
      </div>
      <div>
        {solicitudes.map((soli) => (
          <CardConsultor
            soli={soli}
            funcionario={funcionario}
            key={soli.codigo_solicitud}
          />
        ))}
      </div>
      <Paginacion />
    </>
  );
};

export default Uif;

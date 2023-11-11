import React, { useEffect, useState } from 'react'
import NavFubode from "../../componets/NavFubode";
import { useSolicitud } from '../../context/SolicitudContext';
import { CardConsultor } from '../../componets/Consultor/CardConsultor';
import Paginacion from '../../componets/Paginacion';
import Recargar from '../../componets/Consultor/Recargar';
import { useNavigate } from 'react-router-dom';

const Uif = () => {
  const {
    solicitudes,
    getFuncionario,
    funcionario,
    getSolicitudesUIF,
    getCorreos,
    salir
  } = useSolicitud();

  const navigate = useNavigate();

  const checkForInactivity = () =>{
    const expireTime = localStorage.getItem("expireTime");
    const currentDate = Date.now();
    if(expireTime < currentDate){
      salir()
      //navigate("/");
    }
  }

  const updateExpireTime = () =>{
    const expireTime = Date.now()+900000;
    localStorage.setItem("expireTime",expireTime)
  }


  useEffect(() => {
    const interval = setInterval(()=>{
      checkForInactivity();
    },5000);
    
    return () => clearInterval(interval);
  }, [])
  
  useEffect(() => {
    getFuncionario();
    getCorreos();
    getSolicitudesUIF();

    updateExpireTime();
    window.addEventListener("click",updateExpireTime);
    window.addEventListener("keypress",updateExpireTime);
    window.addEventListener("scroll",updateExpireTime);
    window.addEventListener("mousemove",updateExpireTime);

    return ()=>{
      window.removeEventListener("click",updateExpireTime);
      window.removeEventListener("keypress",updateExpireTime);
      window.removeEventListener("scroll",updateExpireTime);
      window.removeEventListener("mousemove",updateExpireTime);  
    }
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
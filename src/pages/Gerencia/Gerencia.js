import React, { useEffect } from 'react'
import { NavFubode } from '../../componets/NavFubode'
import { useSolicitud } from '../../context/SolicitudContext';
import { CardConsultor } from '../../componets/Consultor/CardConsultor';
import { supabase } from "../../supabase/client";
import { useNavigate } from "react-router-dom";
import { Button} from "react-bootstrap";

const Gerencia = () => {

  const navigate = useNavigate();
  const {
    solicitudesGerencia,
    getFuncionario,
    funcionario,
    getSolicitudesAltaGerencia,setRol
  } = useSolicitud();
  const handleSalir = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setRol(0);
    navigate("/");
  };
  useEffect(() => {
    getFuncionario();
    getSolicitudesAltaGerencia();
  }, []);
  return (
    <>
      <NavFubode/>
      <Button onClick={handleSalir}>SALIR</Button>
      <Button onClick={getSolicitudesAltaGerencia}>Actualizar</Button>
      <div className="container d-flex justify-content-center align-items-center h-100">
          <div className="row m-1">
            {solicitudesGerencia.map((soli, key) => (
              //<h1 key={key}>{soli.producto}</h1>
              <CardConsultor soli={soli} funcionario = {funcionario} key={key} />
            ))}
          </div>
        </div>
    </>
  )
}

export default Gerencia
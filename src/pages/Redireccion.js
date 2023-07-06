import React, { useEffect } from 'react'
import { useSolicitud } from '../context/SolicitudContext';

const Redireccion = () => {
    const { funcionario } = useSolicitud();
    const handle = ()=>{
        console.log(funcionario);
    }
    useEffect(() => {
        console.log(funcionario);
    }, [])
  return (
    <div>Redireccion
        <button onClick={handle}></button>
    </div>
  )
}

export default Redireccion
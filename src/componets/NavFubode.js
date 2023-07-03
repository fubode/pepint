import React from "react";
import logo from "../assets/img/fubode-768x450.webp";
export const NavFubode = () => {
  return (
    <div>      
      <div className="container-fluid">      
        <div className="row">
          <div className="col-2"><img src={logo} alt="Fubode logo" style={{ width: '150px' }}/></div>
          <div className="col-10">
            <div className="text-center">
            <h3>
              SISTEMA DE AUTOMATIZACION DE AUTORIZACION DE CLIENTES ESPECIALES
            </h3>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

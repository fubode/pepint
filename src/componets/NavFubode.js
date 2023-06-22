import React from "react";
import logo from "../assets/img/logo.png";
export const NavFubode = () => {
  return (
    <div>      
      <div className="container-fluid">      
        <div className="row">
          <div className="col-2"><img src={logo} alt="Fubode logo" /></div>
          <div className="col-10">
            <div className="text-center">
            <h3>
              SISTEMA DE AUTOMATIZACION DE AUTORIZACION DE CLIENTES ESPCIALES
            </h3>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

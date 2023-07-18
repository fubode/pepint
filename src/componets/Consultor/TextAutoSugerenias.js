import React, { useState } from "react";
import { useSolicitud } from "../../context/SolicitudContext";


export const TextAutoSugerenias = (validacion) => {
  const [inputValue, setInputValue] = useState("");
  const [sugerencias, setSugerencias] = useState([]);

  const { caedec, caedecSeleccionado, setCaedecSeleccionado } = useSolicitud();

  const handleInputChange = (e) => {
    const valor = e.target.value;
    
    setInputValue(valor);

    // Filtrar caedec por codigo y descripcion
    const coincidencias = caedec.filter((info) =>
      (info.cod_caedec + "-" + info.caedec)
        .toLowerCase()
        .includes(valor.toLowerCase())
    );
    setSugerencias(coincidencias);
    if(valor===""){
      setSugerencias([]);
      setCaedecSeleccionado({});
    }
  };

  const handleSuggestionClick = (caedecInfo) => {
    setCaedecSeleccionado(caedecInfo);
    setInputValue(caedecInfo.caedec);
    setSugerencias([]);
  };

  return (
    <div>
      <input
        className="form-control text-uppercase"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="ESCRIBE CODIGO O DESCRIPCION DEL CAEDEC"
      />
      <ul>
        {sugerencias.map((caedecInfo, index) => (
          <li key={index} onClick={() => handleSuggestionClick(caedecInfo)}>
            {caedecInfo.cod_caedec + " - " + caedecInfo.caedec}
          </li>
        ))}
      </ul>
      <div>
      {Object.keys(caedecSeleccionado).length !== 0 && (
          <>
            <p>CODIGO: {caedecSeleccionado.cod_caedec}</p>
            <p>NOMBRE: {caedecSeleccionado.caedec}</p>
          </>          
        )}  
        {Object.keys(caedecSeleccionado).length === 0 && (
          <>
            <p>Debe seleccionar un caedec</p>
          </>          
        )}       
      </div>
    </div>
  );
};

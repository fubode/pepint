import React, { useState } from "react";
import { useSolicitud } from "../../context/SolicitudContext";

const paises = [
  { nombre: "Argentina", codigo: "0549" },
  { nombre: "Bolivia", codigo: "0591" },
  { nombre: "Colombia", codigo: "0578" },
  { nombre: "Chile", codigo: "0563" },
  { nombre: "Ecuador", codigo: "0593" },
  { nombre: "España", codigo: "0349" },
  { nombre: "Estados Unidos", codigo: "001" },
  { nombre: "México", codigo: "0522" },
  { nombre: "Perú", codigo: "0514" },
  { nombre: "Uruguay", codigo: "0598" },
  { nombre: "Venezuela", codigo: "0582" },
];

export const TextAutoSugerenias = () => {
  const [inputValue, setInputValue] = useState("");
  const [sugerencias, setSugerencias] = useState([]);

  const { caedec, caedecSeleccionado, setCaedecSeleccionado } = useSolicitud();

  const handleInputChange = (e) => {
    const valor = e.target.value;
    setInputValue(valor);

    // Filtrar los países que coincidan con el valor ingresado
    const coincidencias = caedec.filter((info) =>
      (info.cod_caedec + "-" + info.caedec)
        .toLowerCase()
        .includes(valor.toLowerCase())
    );

    setSugerencias(coincidencias);
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
      </div>
    </div>
  );
};

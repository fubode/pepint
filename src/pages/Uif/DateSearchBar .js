import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DateSearchBar = ({ onDateSearch }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("TODOS");

  const handleDateSearch = () => {
    onDateSearch(startDate, endDate, status);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="TODOS">TODOS</option>
              <option value="RECHAZADO">RECHAZADO</option>
              <option value="ACEPTADO">ACEPTADO</option>
              <option value="GERENCIA">GERENCIA</option>
              <option value="PENDIENTE">PENDIENTE</option>
            </select>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleDateSearch}
            >
              Imprimir reporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateSearchBar;

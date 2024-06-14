import React from "react";

const CardComponent = ({ title, number, color }) => {
  return (
    <div className="col-md-3">
      <div className="card mb-4 shadow-sm">
        <div className="card-body text-center">
          <h5 className="card-subtitle mb-2 text-muted">{title}</h5>
          <h1 className="card-title display-4">{number}</h1>
        </div>
        <div
          className={`card-footer bg-${color}`}
          style={{ height: "10px" }}
        ></div>
      </div>
    </div>
  );
};
export default CardComponent;

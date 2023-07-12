import React, { useEffect } from "react";
import Login from "./pages/Login";
import NotFoud from "./pages/NotFoud";
import { TaskContextProvider } from "./context/TaskContext";
import {Consultor} from "./pages/Consultor/Consultor";
import { SolicitudContextProvider } from "./context/SolicitudContext";
import Uif from "./pages/Uif/Uif";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Gerencia  from "./pages/Gerencia/Gerencia";

function App() {

  return (
    <div className="App">
      <TaskContextProvider>
        <SolicitudContextProvider>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/consultor" element={<Consultor />} />
            <Route path="/uif" element={<Uif />} />
            <Route path="/gerencia" element={<Gerencia/>} />
            <Route path="/*" element={<NotFoud />} />
          </Routes>
        </SolicitudContextProvider>
      </TaskContextProvider>
    </div>
  );
}

export default App;

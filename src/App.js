import React from "react";
import Login from "./pages/Login";
import NotFoud from "./pages/NotFoud";
import {Consultor} from "./pages/Consultor/Consultor";
import { SolicitudContextProvider } from "./context/SolicitudContext";
import Uif from "./pages/Uif/Uif";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Gerencia  from "./pages/Gerencia/Gerencia";
import './index.css'

function App() {

  return (
    <div className="App">
        <SolicitudContextProvider>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/consultor" element={<Consultor />} />
            <Route path="/uif" element={<Uif />} />
            <Route path="/gerencia" element={<Gerencia/>} />
            <Route path="/*" element={<NotFoud />} />
          </Routes>
        </SolicitudContextProvider>
    </div>
  );
}

export default App;

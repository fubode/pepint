import React, { useEffect } from "react";
import Login from "./pages/Login";
import NotFoud from "./pages/NotFoud";
import { TaskContextProvider } from "./context/TaskContext";
import {Consultor} from "./pages/Consultor/Consultor";
import { SolicitudContextProvider } from "./context/SolicitudContext";
import Uif from "./pages/Uif/Uif";
import Gerencia from "./pages/Gerencia/Gerencia";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  /*
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }, [navigate]);

    <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/consultor" element={<Consultor />} />
            <Route path="/uif" element={<Uif />} />
            <Route path="/gerencia" element={<Consultor />} />
            <Route path="/*" element={<NotFoud />} />
          </Routes>
*/

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

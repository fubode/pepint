import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFoud from "./pages/NotFoud";
import { TaskContextProvider } from "./context/TaskContext";
import { supabase } from "./supabase/client";
import { Consultor } from "./pages/Consultor/Consultor";
import {
  SolicitudContext,
  SolicitudContextProvider,
} from "./context/SolicitudContext";
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <div className="App">
      <TaskContextProvider>
        <SolicitudContextProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Consultor />} />
            <Route path="/*" element={<NotFoud />} />
          </Routes>
        </SolicitudContextProvider>
      </TaskContextProvider>
    </div>
  );
}

export default App;

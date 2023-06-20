import React, { useEffect } from 'react';
import { Routes,Route,useNavigate } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import NotFoud from './pages/NotFoud';
import { supabase } from "./supabase/client";
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
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/*" element = {<NotFoud/>}/>
      </Routes>
    </div>
  );
}

export default App;

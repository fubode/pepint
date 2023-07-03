import React, { useContext, useEffect } from 'react'
import { supabase } from "../supabase/client";
import {useNavigate} from "react-router-dom";
import TaskForm from "../componets/ejemplos/TaskForm";
import TaskList from "../componets/ejemplos/TaskForm";


const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(!supabase.auth.getUser()){
      navigate('/login')
      console.log("home - login");
    }else{
      console.log("home - home");
      //navigate('/login')
    }
  }, [navigate])
  
  return (
    <div>
        <button onClick={()=>supabase.auth.signOut()}>Logout</button>
        <TaskForm />
        <TaskList/>
    </div>
  )
}

export default Home

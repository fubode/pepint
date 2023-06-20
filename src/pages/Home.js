import React, { useContext, useEffect } from 'react'
import { supabase } from "../supabase/client";
import {useNavigate} from "react-router-dom";
import TaskForm from "../componets/TaskForm";
import TaskList from "../componets/TaskList";


const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(!supabase.auth.getUser()){
      navigate('/login')
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

import { useState } from "react"
import React from 'react'
import { supabase } from "../supabase/client";

const TaskForm = () => {
    const [taskName, setTaskName] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
          const user = (await supabase.auth.getUser()).data.user.id;
          const result = await supabase.from('tasks').insert({
            name :  taskName,
            userId : user
          });
          console.log(result)
        } catch (error) {
          console.log(error)
        }
    };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
            type = 'text' 
            name='taskName' 
            placeholder='Escriba un nombre'
            onChange={(e)=> setTaskName(e.target.value)}
            />
            <button>Enviar</button>
      </form>
    </div>
  )
}

export default TaskForm

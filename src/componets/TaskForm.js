import { useState } from "react"
import React from 'react'
import {useTasks} from "../context/TaskContext";

const TaskForm = () => {
    const [taskName, setTaskName] = useState("");
    const {createTask,adding} = useTasks()
    const handleSubmit = async(e)=>{
        e.preventDefault();       
        createTask(taskName); 
        setTaskName("");
    };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
            type = 'text' 
            name='taskName' 
            placeholder='Escriba un nombre'
            onChange={(e)=> setTaskName(e.target.value)}
            value={taskName}
            />
            <button disabled={adding}>
              {adding ? "Enviando...":"Enviar"}
              </button>
      </form>
    </div>
  )
}

export default TaskForm

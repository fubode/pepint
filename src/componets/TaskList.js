import React, { useEffect } from "react";

import { useTasks } from "../context/TaskContext";
import { TaskCard } from "./TaskCard";

const TaskList = () => {
  const { tasks, getTask,loading } = useTasks();

  useEffect(() => {
    getTask(true);
  }, []);

  function renderTask(){
    if(loading){
      return <p>Loading...</p>
    }else if(tasks.length===0){
      return <p>Tareas no encontradas</p>
    }
    else{
      return (
        <div>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      );    
    }
  }

  return <div>
    {renderTask()}
  </div>
};

export default TaskList;

import { Context, createContext, useContext, useState } from "react";
import { supabase } from "../supabase/client";
export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("Error del useTask");
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTask = async (done = true) => {
    setLoading(true);
    const user = (await supabase.auth.getUser()).data.user.id;
    const { error, data } = await supabase
      .from("tasks")
      .select()
      .eq("userId", user)
      //.eq("done",done)
      .order("id", { ascending: true });

    console.log(data);
    if (error) throw error;
    setTasks(data);
    setLoading(false);
  };

  const createTask = async (taskName) => {
    setAdding(true);
    try {
      const user = (await supabase.auth.getUser()).data.user.id;
      const { error } = await supabase.from("tasks").insert({
        name: taskName,
        userId: user,
      });
      if (error) throw error;
      getTask();
    } catch (error) {
      console.log(error);
    } finally {
      setAdding(false);
    }
  };

  const deleteTask = async (id) => {
    const user = (await supabase.auth.getUser()).data.user.id;
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("userId", user)
      .eq("id", id);

      if(error) throw error;      
      getTask();
  };

  const updateTask = async(id,updateFiels)=>{
    console.log(id,updateFiels);
    const user = (await supabase.auth.getUser()).data.user.id;
    const { error } = await supabase
      .from("tasks")
      .update(updateFiels)
      .eq("userId", user)
      .eq("id", id);

      if(error) throw error;      
      getTask();
  };

  return (
    <TaskContext.Provider
      value={{ tasks, getTask, createTask, adding, loading, deleteTask,updateTask}}
    >
      {children}
    </TaskContext.Provider>
  );
};

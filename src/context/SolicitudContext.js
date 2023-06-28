import { Context, createContext, useContext, useState } from "react";
import { supabase } from "../supabase/client";
export const SolicitudContext = createContext();

export const useSolicitud = () => {
  const context = useContext(SolicitudContext);
  if (!context) throw new Error("Error del solicitudContext");
  return context;
};

export const SolicitudContextProvider = ({ children }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [caedec, setCaedec] = useState([]);
  const [caedecSeleccionado, setCaedecSeleccionado] = useState({});
  const [userUIF, setUserUIF] = useState({});

  const getUsuarioIFD = async () => {
    const user = (await supabase.auth.getUser()).data.user.id;
    
    const { data, error } = await supabase.rpc('echo', { say: '👋' });
    const { data1, error1 } = await supabase.rpc('myFuncion2', { variable: 1 });


    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error.message);
      return;
    }

    console.log("Resultados de la consulta:", data,error);
    console.log("Resultados de la consulta:", data1,error1);
    setUserUIF(data);
  };

  const getSolicitudes = async () => {
    const user = (await supabase.auth.getUser()).data.user.id;
    const { error, data } = await supabase
      .from("uif_solicitudes")
      .select()
      .eq("id_usuario", user)
      .order("id", { ascending: true });
  };

  const getCaedec = async () => {
    const { error, data } = await supabase.from("conf_caedec").select();
    setCaedec(data);
  };

  const createSolicitudes = async (solicitud) => {
    setAdding(true);
    try {
      const user = (await supabase.auth.getUser()).data.user.id;
      solicitud.id_usuario = user;
      const { error } = await supabase
        .from("uif_solicitudes")
        .insert(solicitud);
      if (error) throw error;
      getSolicitudes();
    } catch (error) {
      console.log(error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <SolicitudContext.Provider
      value={{
        solicitudes,
        getSolicitudes,
        loading,
        createSolicitudes,
        getCaedec,
        caedec,
        caedecSeleccionado,
        setCaedecSeleccionado,
        getUsuarioIFD,
      }}
    >
      {children}
    </SolicitudContext.Provider>
  );
};

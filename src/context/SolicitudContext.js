import { Context, createContext, useContext, useState } from "react";
import { supabase } from "../supabase/client";
export const SolicitudContext = createContext();

export const useSolicitud = ()=>{
    const context = useContext(SolicitudContext);
  if (!context) throw new Error("Error del solicitudContext");
  return context;
};

export const SolicitudContextProvider = ({ children }) => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [adding, setAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [caedec, setCaedec] = useState([]);

    const getSolicitudes = async () => {
      const user = (await supabase.auth.getUser()).data.user.id;
      const { error, data } = await supabase
      .from("uif_solicitudes")
      .select()
      .eq("id_usuario", user)
      .order("id", { ascending: true });
      console.log(error, data );
    };

    const getCaedec = async ()=>{
      const { error, data } = await supabase
      .from("conf_caedec")
      .select()
      setCaedec(data);
      console.log(caedec);
    };
  
    const createSolicitudes = async (cod_caedec,tipo,numero_doc,nombre_completo,producto) => {      
      setAdding(true);
      try {
        const user = (await supabase.auth.getUser()).data.user.id;
        const { error } = await supabase.from("uif_solicitudes").insert({
          id_usuario: user,              
          cod_caedec: cod_caedec,
          tipo: tipo,
          descripcion: 'NINGUNO',
          numero_doc: numero_doc,
          nombre_completo: nombre_completo,
          producto: producto,
          estado: 'PENDIENTE',
        });
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
        value={{solicitudes, getSolicitudes,loading,createSolicitudes,getCaedec,caedec }}
      >
        {children}
      </SolicitudContext.Provider>
    );
  };  
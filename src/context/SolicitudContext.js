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

    const getSolicitudes = async () => {
      setLoading(true);
      const user = (await supabase.auth.getUser()).data.user.id;
      const { error, data } = await supabase
        .from("uif_solicitud")
        .select()
        .eq("userId", user)
        //.eq("done",done)
        .order("created_at", { ascending: true });
  
      console.log(data);
      if (error) throw error;
      setSolicitudes(data);
      setLoading(false);
    };
  
    const createSolicitudes = async (ci,extencion,nombre,producto,caedecDesc,caedecNro,tipo) => {
      setAdding(true);
      try {
        const user = (await supabase.auth.getUser()).data.user.id;
        const { error } = await supabase.from("uif_solicitud").insert({
            userId: user,
            ci: ci,
            ext: extencion,
            producto:producto,
            caedec:caedecNro,
            tipo:tipo,                        
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
        value={{solicitudes, getSolicitudes,loading,createSolicitudes }}
      >
        {children}
      </SolicitudContext.Provider>
    );
  };
  
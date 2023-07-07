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
  const [funcionario, setFuncionario] = useState({});

  const getFuncionario = async () => {
    const usuario_supa = (await supabase.auth.getUser()).data.user.id;

    let { data, error } = await supabase.rpc("obtener_usuario", {
      usuario_supa,
    });
    if (error) console.error(error);
    setFuncionario(data);
    console.log(funcionario);
  };

  const getCaedec = async () => {
    const { error, data } = await supabase.from("conf_caedec").select();
    setCaedec(data);
  };

  const getSolicitudes = async () => {
    const usuario_supa = (await supabase.auth.getUser()).data.user.id;
    let { data, error } = await supabase.rpc("uif_solicitudes", {
      usuario_supa,
    });

    if (error) console.error(error);
    setSolicitudes(data);
  };

  const getSolicitudesUIF = async () => {
    const correo = funcionario.correo;
    let { data, error } = await supabase.rpc("uif_solicitudesUIF", {
      correo,
    });

    if (error) console.error(error);
    setSolicitudes(data);
  };

  const aceptarSolicitud = async (codigoSolicitud) => {
    console.log(codigoSolicitud);
    const descripcion = "La solicitud fue aceptada";
    const estado = "ACEPTADO";
    const fechaModificacion = new Date();
    const correoFinal = funcionario.correo;
    
    const { data, error } = await supabase
      .from("uif_solicitudes")
      .update({
        descripcion: descripcion,
        estado: estado,
        fecha_modificacion: fechaModificacion,
        correo_final: correoFinal,
      })
      .eq("codigo_solicitud", codigoSolicitud);
      console.log(data,error)
  };
  
  const rechazarSolicitud = (codigoSolicitud) =>{
    console.log(codigoSolicitud);
  }

  const createSolicitudes = async (solicitud) => {
    console.log(funcionario);
    setAdding(true);
    const codigo =
      funcionario.cod_usuario +
      "-" +
      solicitud.tipo +
      "-" +
      (solicitudes.length + 1);
    var today = new Date();
    try {
      const user = (await supabase.auth.getUser()).data.user.id;
      solicitud.id_usuario = user;
      solicitud.codigo_solicitud = codigo;
      solicitud.correo_usuario_uif = "unidad_cumplimiento@fubode.org";

      const { error } = await supabase
        .from("uif_solicitudes")
        .insert(solicitud);
    } catch (error) {
      console.log(error);
    } finally {
      setAdding(false);
      getSolicitudes();
    }
  };

  return (
    <SolicitudContext.Provider
      value={{
        solicitudes,
        funcionario,
        loading,
        caedec,
        caedecSeleccionado,
        createSolicitudes,
        getCaedec,
        setCaedecSeleccionado,
        getFuncionario,
        getSolicitudes,
        getSolicitudesUIF,
        aceptarSolicitud,
      }}
    >
      {children}
    </SolicitudContext.Provider>
  );
};

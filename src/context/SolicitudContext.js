import { Context, createContext, useContext, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
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
  const [funcionario, setFuncionario] = useState({});
  const [rol, setRol] = useState(0);
  const [solicitudesUIF, setSolicitudesUIF] = useState([]);
  const [correosAltaGerencia, setCorreosAltaGerencia] = useState([]);
  const [solicitudesGerencia, setSolicitudesGerencia] = useState([])

  const navigate = useNavigate();

  const getFuncionario = async () => {
    const usuario_supa = (await supabase.auth.getUser()).data.user.id;

    let { data, error } = await supabase.rpc("obtener_usuario", {
      usuario_supa,
    });
    if (error) console.error(error);
    setFuncionario(data);
    console.log(funcionario);
    let rolEncontrado = 0;
    if (data && data.roles) {
      console.log(data.roles);
      let roles = data.roles;
      const rolesPermitidos = [6, 7, 8];
      const encontrado = roles.find((rol) =>
        rolesPermitidos.includes(rol.id_rol)
      );
      if (encontrado) {
        rolEncontrado = encontrado.id_rol;
        setRol(rolEncontrado);
        console.log(rolEncontrado);
      }
    }
    console.log("navegacion");
    console.log(rol);
    if (rolEncontrado !== 0) {
      console.log(rolEncontrado);
      switch (rolEncontrado) {
        case 6:
          navigate("/consultor");
          break;
        case 7:
          navigate("/uif");
          break;
        case 8:
          break;
        default:
          navigate("/login");
          break;
      }
    } else {
    }
  };

  const getCorreosAltaGerencia = async () => {
    let { data, error } = await supabase.rpc("obtener_alta_gerencia");

    if (error) console.error(error);
    setCorreosAltaGerencia(data);
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

  const getSolicitudesAltaGerencia = async() =>{
    const correo_solicitud = funcionario.correo;
    console.log(correo_solicitud,funcionario.correo);
    let { data, error } = await supabase.rpc("solicitudes_gerencia", {
      correo_solicitud,
    });

    if (error){
      setSolicitudesGerencia([]);
      return;
    } 
    setSolicitudesGerencia(data);
  };

  const getSolicitudesUIF = async () => {
    const correo_solicitud = "unidad_cumplimiento@fubode.org"; //funcionario.correo;
    let { data, error } = await supabase.rpc("solicitudes_correo", {
      correo_solicitud:correo_solicitud,
      limit_value:100,
      offset_value:0
    });

    if (error) console.error(error);
    else console.log(data);
    console.log(data);
    setSolicitudesUIF(data);
  };

  const modificarSolicitud = async (
    codigoSolicitud,
    detalle,
    estadoSolicitud
  ) => {
    console.log(codigoSolicitud);
    const descripcion = detalle;
    const estado = estadoSolicitud;
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
    console.log(data, error);
    getSolicitudesUIF();
  };
  const enviarAltaGerencia = async (codigo, descripcion, gerencia, estado) => {
    const { data, error } = await supabase
      .from("uif_solicitudes")
      .update({
        descripcion: descripcion,
        estado: estado,
        fecha_modificacion: new Date(),
        correo_usuario_ag: gerencia,
      })
      .eq("codigo_solicitud", codigo);
    console.log(data, error);
    getSolicitudesUIF();
  };

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

  const navegacion = () => {
    console.log("navegacion");
    if (rol !== 0) {
      console.log(rol);
      switch (rol) {
        case 6:
          navigate("/consultor");
          break;
        case 7:
          navigate("/uif");
          break;
        case 8:
          navigate("/gerencia");
          break;
        default:
          navigate("/");
          break;
      }
    } else {
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
        modificarSolicitud,
        navegacion,
        setFuncionario,
        solicitudesUIF,
        rol,
        getCorreosAltaGerencia,
        correosAltaGerencia,
        enviarAltaGerencia,
        getSolicitudesAltaGerencia,
        solicitudesGerencia,
        setRol
      }}
    >
      {children}
    </SolicitudContext.Provider>
  );
};

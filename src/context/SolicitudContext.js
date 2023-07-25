import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
export const SolicitudContext = createContext();

export const useSolicitud = () => {
  const context = useContext(SolicitudContext);
  if (!context) throw new Error("Error del solicitudContext");
  return context;
};

export const SolicitudContextProvider = ({ children }) => {
  const initialState = {
    solicitudes: [],
    adding: false,
    loading: false,
    caedec: [],
    caedecSeleccionado: {},
    funcionario: {},
    rol: 0,
    solicitudesUIF: [],
    correosAltaGerencia: [],
    solicitudesGerencia: [],
    paginacion: {
      limit: 3,
      offset: 0,
      paginas: 6,
      datos: 17,
    },
    correos: [],
  };

  const [solicitudes, setSolicitudes] = useState(initialState.solicitudes);
  const [adding, setAdding] = useState(initialState.adding);
  const [loading, setLoading] = useState(initialState.loading);
  const [caedec, setCaedec] = useState(initialState.caedec);
  const [caedecSeleccionado, setCaedecSeleccionado] = useState(
    initialState.caedecSeleccionado
  );
  const [funcionario, setFuncionario] = useState(initialState.funcionario);
  const [rol, setRol] = useState(initialState.rol);
  const [solicitudesUIF, setSolicitudesUIF] = useState(
    initialState.solicitudesUIF
  );
  const [correosAltaGerencia, setCorreosAltaGerencia] = useState(
    initialState.correosAltaGerencia
  );
  const [solicitudesGerencia, setSolicitudesGerencia] = useState(
    initialState.solicitudesGerencia
  );
  const [paginacion, setPaginacion] = useState(initialState.paginacion);
  const [correos, setCorreos] = useState(initialState.correos);

  const navigate = useNavigate();

  const getFuncionario = async () => {
    const usuario_supa = (await supabase.auth.getUser()).data.user.id;

    let { data, error } = await supabase.rpc("obtener_usuario", {
      usuario_supa,
    });
    if (error) console.error(error);
    setFuncionario(data);
    console.log(data);
  };

  useEffect(() => {
    let rolEncontrado = 0;
    if (funcionario && funcionario.roles) {
      console.log(funcionario.roles);
      let roles = funcionario.roles;
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
          navigate("/gerencia");
          break;
        default:
          navigate("/login");
          break;
      }
    } else {
    }
  }, [funcionario]);

  const getCaedec = async () => {
    const { error, data } = await supabase.from("conf_caedec").select();
    setCaedec(data);
  };

  const getSolicitudes = async () => {
    const usuario_supa = (await supabase.auth.getUser()).data.user.id;
    let { data, error } = await supabase.rpc("uif_solicitudes", {
      usuario_supa,
      limit_value: paginacion.limit,
      offset_value: paginacion.offset,
    });

    if (error) {
      console.error(error);
      return;
    } else {
      console.log(data);
      const nuevasPaginas = Math.round(
        data[0].cantidad_solicitudes / paginacion.limit
      );
      console.log(nuevasPaginas);

      setPaginacion((prevPaginacion) => ({
        ...prevPaginacion,
        paginas: nuevasPaginas,
      }));
      const nuevosDatos = data[0].cantidad_solicitudes;
      setPaginacion((prevDatos) => ({
        ...prevDatos,
        datos: nuevosDatos,
      }));
      setSolicitudes(data);
    }
  };

  const getSolicitudesUIF = async () => {
    const supa_correo = "unidad_cumplimiento@fubode.org"; //funcionario.correo;
    let { data, error } = await supabase.rpc("solicitudes_correo", {
      supa_correo: supa_correo,
      limit_value: paginacion.limit,
      offset_value: paginacion.offset,
    });

    if (error) {
      console.error(error);
    } else {
      console.log(data);
      const nuevasPaginas = Math.round(
        data[0].cantidad_solicitudes / paginacion.limit
      );
      console.log(nuevasPaginas);

      setPaginacion((prevPaginacion) => ({
        ...prevPaginacion,
        paginas: nuevasPaginas,
      }));
      setSolicitudes(data);
      const nuevosDatos = data[0].cantidad_solicitudes;
      setPaginacion((prevDatos) => ({
        ...prevDatos,
        datos: nuevosDatos,
      }));
      setSolicitudes(data);
    }
  };

  const getSolicitudesGerencia = async () => {
    const supa_correo = funcionario.correo;
    let { data, error } = await supabase.rpc("solicitudes_gerencia", {
      supa_correo: supa_correo,
      limit_value: paginacion.limit,
      offset_value: paginacion.offset,
    });

    if (error) {
      console.error(error);
      return;
    } else {
      console.log(data);
      const nuevasPaginas = Math.round(
        data[0].cantidad_solicitudes / paginacion.limit
      );
      console.log(nuevasPaginas);

      setPaginacion((prevPaginacion) => ({
        ...prevPaginacion,
        paginas: nuevasPaginas,
      }));
      setSolicitudes(data);
      const nuevosDatos = data[0].cantidad_solicitudes;
      setPaginacion((prevDatos) => ({
        ...prevDatos,
        datos: nuevosDatos,
      }));
      setSolicitudes(data);
    }
  };

  const getCorreos = async () => {
    let { data, error } = await supabase.rpc("obtener_alta_gerencia");

    if (error) console.error(error);
    else console.log(data);
    setCorreos(data);
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
    console.log(fechaModificacion);
    var timeZoneOffset = fechaModificacion.getTimezoneOffset() * 60 * 1000;
    var gmtTime = new Date(fechaModificacion.getTime() - timeZoneOffset);
    const correoFinal = funcionario.correo;
    
    if (rol == 7) {
      const { data, error } = await supabase
      .from("uif_solicitudes")
      .update({
        descripcion: descripcion,
        estado: estado,
        fecha_modificacion: gmtTime,
        correo_final: correoFinal,
      })
      .eq("codigo_solicitud", codigoSolicitud);
      getSolicitudesUIF();
    }
    if (rol == 8) {
      const { data, error } = await supabase
      .from("uif_solicitudes")
      .update({
        estado: estado,
        fecha_modificacion: gmtTime,
        correo_final: correoFinal,
      })
      .eq("codigo_solicitud", codigoSolicitud);
      getSolicitudesGerencia();
    }
  };

  const enviarSolicitudGerecia = async (
    codigoSolicitud,
    detalle,
    corroGerencia,
    estado
  ) => {
    console.log(codigoSolicitud);

    const { data, error } = await supabase
      .from("uif_solicitudes")
      .update({
        descripcion: detalle,
        estado: estado,
        fecha_modificacion: new Date(),
        correo_usuario_ag: corroGerencia,
      })
      .eq("codigo_solicitud", codigoSolicitud);
    console.log(data, error);
    getSolicitudesUIF();
  };

  const rechazarSolicitud = (codigoSolicitud) => {
    console.log(codigoSolicitud);
  };

  const createSolicitudes = async (solicitud) => {
    console.log(funcionario);
    setAdding(true);
    const codigo =
      funcionario.cod_usuario +
      "-" +
      solicitud.tipo +
      "-" +
      (paginacion.datos + 1);
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

  const salir = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setSolicitudes(initialState.solicitudes);
    setAdding(initialState.adding);
    setLoading(initialState.loading);
    setCaedec(initialState.caedec);
    setCaedecSeleccionado(initialState.caedecSeleccionado);
    setFuncionario(initialState.funcionario);
    setRol(initialState.rol);
    setSolicitudesUIF(initialState.solicitudesUIF);
    setCorreosAltaGerencia(initialState.correosAltaGerencia);
    setSolicitudesGerencia(initialState.solicitudesGerencia);
    setPaginacion(initialState.paginacion);
    navigate("/");
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
        paginacion,
        setPaginacion,
        salir,
        getCorreos,
        enviarSolicitudGerecia,
        solicitudesGerencia,
        getSolicitudesGerencia,
        correos
      }}
    >
      {children}
    </SolicitudContext.Provider>
  );
};

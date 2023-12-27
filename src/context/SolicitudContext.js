import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
      limit: 15,
      offset: 0,
      paginas: 6,
      datos: 17,
    },
    correos: [],
  };

  const [solicitudes, setSolicitudes] = useState(initialState.solicitudes);
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
  const [solicitudesGerencia, setSolicitudesGerencia] = useState(
    initialState.solicitudesGerencia
  );
  const [paginacion, setPaginacion] = useState(initialState.paginacion);
  const [correos, setCorreos] = useState(initialState.correos);

  const [showMessageSucces, setShowMessageSucces] = useState(false);

  const navigate = useNavigate();

  const getFuncionario = async () => {
    const usuario_supa = (await supabase.auth.getUser()).data.user.id;
    //console.log(usuario_supa)
    let { data, error } = await supabase.rpc("obtener_usuario", {
      usuario_supa,
    });
    if (error) console.error(error);
    setFuncionario(data);
  };

  useEffect(() => {
    let rolEncontrado = 0;
    if (funcionario && funcionario.roles) {
      let roles = funcionario.roles;
      const rolesPermitidos = [6, 7, 8];
      const encontrado = roles.find((rol) =>
        rolesPermitidos.includes(rol.id_rol)
      );
      if (encontrado) {
        rolEncontrado = encontrado.id_rol;
        setRol(rolEncontrado);
      }
    }
    if (rolEncontrado !== 0) {
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
          console.log('no encontro nad')
          navigate("/login");
          break;
      }
    } else {
      //console.log('no se encontro el rol')
    }
  }, [funcionario]);

  const getCaedec = async () => {
    const { data } = await supabase.from("conf_caedec").select();
    setCaedec(data);
  };

  const getSolicitudes = async () => {
    const cod_solicitud = funcionario.cod_usuario;
    console.log()
    let { data, error } = await supabase.rpc("uif_solicitudes", {
      cod_solicitud,
      limit_value: paginacion.limit,
      offset_value: paginacion.offset,
    });
    //console.log(data);
    if (error) {
      return;
    } else {
      const nuevasPaginas =
        data.length === 0
          ? 0
          : Math.round(data[0].cantidad_solicitudes / paginacion.limit);

      setPaginacion((prevPaginacion) => ({
        ...prevPaginacion,
        paginas: nuevasPaginas,
      }));

      const nuevosDatos = data.length === 0 ? 0 : data[0].cantidad_solicitudes;

      setPaginacion((prevDatos) => ({
        ...prevDatos,
        datos: nuevosDatos,
      }));
      setSolicitudes(data);
    }
  };

  const getSolicitudesUIF = async () => {
    const supa_correo = "unidad_cumplimiento@fubode.org";
    let { data, error } = await supabase.rpc("solicitudes_correo", {
      supa_correo: supa_correo,
      limit_value: paginacion.limit,
      offset_value: paginacion.offset,
    });

    if (error) {
    } else {
      const nuevasPaginas =
        data.length === 0
          ? 0
          : Math.round(data[0].cantidad_solicitudes / paginacion.limit);

      setPaginacion((prevPaginacion) => ({
        ...prevPaginacion,
        paginas: nuevasPaginas,
      }));
      setSolicitudes(data);
      const nuevosDatos = data.length === 0 ? 0 : data[0].cantidad_solicitudes;
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
      return;
    } else {
      const nuevasPaginas =
        data.length === 0
          ? 0
          : Math.round(data[0].cantidad_solicitudes / paginacion.limit);

      setPaginacion((prevPaginacion) => ({
        ...prevPaginacion,
        paginas: nuevasPaginas,
      }));
      setSolicitudes(data);
      const nuevosDatos = data.length === 0 ? 0 : data[0].cantidad_solicitudes;
      setPaginacion((prevDatos) => ({
        ...prevDatos,
        datos: nuevosDatos,
      }));
      setSolicitudes(data);
    }
  };

  const getCorreos = async () => {
    let { data, error } = await supabase.rpc("obtener_alta_gerencia");

    if (error) return;
    setCorreos(data);
  };

  const modificarSolicitud = async (
    codigoSolicitud,
    detalle,
    estadoSolicitud,
    solicitud
  ) => {
    const descripcion = detalle;
    const estado = estadoSolicitud;
    const fechaModificacion = new Date();
    var timeZoneOffset = fechaModificacion.getTimezoneOffset() * 60 * 1000;
    var gmtTime = new Date(fechaModificacion.getTime() - timeZoneOffset);
    const correoFinal = funcionario.correo;

    if (rol === 7) {
      const { error } = await supabase
        .from("uif_solicitudes")
        .update({
          descripcion: descripcion,
          estado: estado,
          fecha_modificacion: gmtTime,
          correo_final: correoFinal,
        })
        .eq("codigo_solicitud", codigoSolicitud);

      if (!error) {
        const detalleEmail = emailCosultorUnidadCumplimientoDetalle(
          codigoSolicitud,
          solicitud.nombre_completo_uif,
          solicitud.numero_doc,
          solicitud.producto,
          formatFechaHora(solicitud.created_at),
          formatFechaHora(new Date()),
          detalle,
          estado
        );
        //"juan_montecinos@fubode.org",
        enviarCorreo(
          solicitud.correo,
          "SOLICITUD DE DEBIDA DILIGENCIA",
          detalleEmail
        );
      }

      getSolicitudesUIF();
    }
    if (rol === 8) {
      const { error } = await supabase
        .from("uif_solicitudes")
        .update({
          estado: estado,
          fecha_modificacion: gmtTime,
          correo_final: correoFinal,
          detalle_gerencia: detalle,
        })
        .eq("codigo_solicitud", codigoSolicitud);

        console.log(codigoSolicitud,
          solicitud.nombre_completo_uif,
          solicitud.numero_doc,
          solicitud.producto,
          formatFechaHora(solicitud.created_at),
          formatFechaHora(new Date()),
          detalle,
          estado,
          solicitud.tipo);
      if (!error) {
        const detalleEmail = emailAGCosultorDetalle(
          codigoSolicitud,
          solicitud.nombre_completo_uif,
          solicitud.numero_doc,
          solicitud.producto,
          formatFechaHora(solicitud.created_at),
          formatFechaHora(new Date()),
          detalle,
          estado,
          solicitud.tipo
        );
        //solicitud.correo,
        enviarCorreo(
          solicitud.correo,
          "SOLICITUD DE DEBIDA DILIGENCIA",
          detalleEmail
        );
        //'201400076@est.umss.edu',
        enviarCorreo(
          "unidad_cumplimiento@fubode.org",
          "SOLICITUD DE DEBIDA DILIGENCIA",
          detalleEmail
        );
      }
      getSolicitudesGerencia();
    }
  };

  const enviarSolicitudGerecia = async (
    codigoSolicitud,
    detalle,
    corroGerencia,
    estado,
    solicitud
  ) => {
    const { data, error } = await supabase
      .from("uif_solicitudes")
      .update({
        descripcion: detalle,
        estado: estado,
        fecha_modificacion: new Date(),
        correo_usuario_ag: corroGerencia,
      })
      .eq("codigo_solicitud", codigoSolicitud);

    if (!error) {
      //const detalleEmail = emailCosultorUnidadCumplimientoDetalle(
      const detalleEmail = emailUIFAltaGerenciaDetalle(
        codigoSolicitud,
        solicitud.nombre_completo_uif,
        solicitud.numero_doc,
        solicitud.producto,
        formatFechaHora(solicitud.created_at),
        formatFechaHora(new Date()),
        detalle,
        estado
      );
      const detalleEmail2 = emailCosultorUnidadCumplimientoDetalle(
        codigoSolicitud,
        solicitud.nombre_completo_uif,
        solicitud.numero_doc,
        solicitud.producto,
        formatFechaHora(solicitud.created_at),
        formatFechaHora(new Date()),
        detalle,
        estado
      );
      //"juan_montecinos@fubode.org",
      enviarCorreo(
        corroGerencia,
        "SOLICITUD DE DEBIDA DILIGENCIA",
        detalleEmail
      );
      enviarCorreo(
        //"juan_montecinos@fubode.org",
        solicitud.correo,
        "SOLICITUD DE DEBIDA DILIGENCIA",
        detalleEmail2
      );

    }
    getSolicitudesUIF();
  };

  const createSolicitudes = async (solicitud) => {
    const codigo =
      funcionario.cod_usuario +
      "-" +
      solicitud.tipo +
      "-" +
      (paginacion.datos + 1);
    try {
      const codigo_solicitud = funcionario.cod_usuario;
      const user = (await supabase.auth.getUser()).data.user.id;
      solicitud.id_usuario = user;
      solicitud.codigo_solicitud = codigo;
      solicitud.correo_usuario_uif = "unidad_cumplimiento@fubode.org";
      solicitud.codigo_user = codigo_solicitud;

      const { error } = await supabase
        .from("uif_solicitudes")
        .insert(solicitud);

      if (!error) {

        const detalle = emailCosultorUnidadCumplimiento(
          codigo,
          solicitud.nombre_completo,
          solicitud.numero_doc,
          solicitud.producto,
          formatFechaHora(new Date())
        );

        //"201400076@est.umss.edu",
        enviarCorreo("unidad_cumplimiento@fubode.org", "SOLICITUD DE DEBIDA DILIGENCIA", detalle);
      }else{
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      getSolicitudes();
    }
  };

  function formatFechaHora(fecha) {
    const date = new Date(fecha);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const navegacion = () => {
    //console.log(rol)
    if (rol !== 0) {
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
    setLoading(initialState.loading);
    setCaedec(initialState.caedec);
    setCaedecSeleccionado(initialState.caedecSeleccionado);
    setFuncionario(initialState.funcionario);
    setRol(initialState.rol);
    setSolicitudesUIF(initialState.solicitudesUIF);
    setSolicitudesGerencia(initialState.solicitudesGerencia);
    setPaginacion(initialState.paginacion);
    navigate("/");
  };

  const enviarCorreo = async (remitente, asunto, detalle) => {
    
    const EMISOR = "unidadcumplimientoifd@gmail.com";
    const CONTRASENA = "vmzkyupeqagdlbpv";
    //const ENDPOINTCORREO = "http://192.168.10.6:8096/correo";
    const ENDPOINTCORREO = "https://smfm.fubode.org/correo";
    //const ENDPOINTCORREO = "http://localhost:8096/correo";

    try {
      const endpointCorreo = ENDPOINTCORREO; // Reemplaza con la URL del endpoint correspondiente

      const json = {
        emisor: EMISOR,
        contrasenaEmisor: CONTRASENA,
        remitente,
        asunto,
        detalle,
      };

      const response = await axios.post(endpointCorreo, json);
    } catch (error) { }
  };

  const emailCosultorUnidadCumplimiento = (
    codigo,
    nombre,
    ci,
    producto,
    fecha
  ) => {
    const emailDetalle =
      "<p>Según solicitud con el código: <strong>" +
      codigo +
      "</strong>" +
      "</p>" +
      "<p>Solicito por favor su Visto bueno/Autorización para el/la señor (a)  <strong>" +
      nombre.toUpperCase() +
      " </strong> con número de CI <strong>" +
      ci +
      ",</strong> para continuar con la operación de  <strong>" +
      producto +
      "</strong>.</p>" +
      "<p>Fecha: <strong>" +
      fecha +
      "</strong></p>";
    return emailDetalle;
  };

  const emailCosultorUnidadCumplimientoDetalle = (
    codigo,
    nombre,
    ci,
    producto,
    fechaInicio,
    fechaFin,
    detalle,
    estado
  ) => {
    const emailDetalle =
      estado === "ACEPTADO"
        ? "<p>Según solicitud con el código: <strong>" +
        codigo +
        "</strong>" +
        "</p>" +
        "<p>Realizada la Debida Diligencia puede continuar con la operación del señor (a) <strong>" +
        nombre.toUpperCase() +
        " </strong> con número de CI <strong>" +
        ci +
        "<p>Fecha:<strong>" +
        fechaInicio +
        "</strong></p>" +
        "<p>Fecha:<strong>" +
        fechaFin +
        "</strong></p>"
        : estado === "RECHAZADO"
          ? "<p>Según solicitud con el código: <strong>" +
          codigo +
          "</strong>" +
          "</p>" +
          "<p>Realizada la Debida Diligencia se recomienda NO continuar con la operación de <strong>" +
          nombre.toUpperCase() +
          " </strong> con número de CI <strong>" +
          ci +
          "<p>Fecha:<strong>" +
          fechaInicio +
          "</strong></p>" +
          "<p>Fecha:<strong>" +
          fechaFin +
          "</strong></p>"
          : estado === "GERENCIA"
            ? "<p>Según solicitud con el código: <strong>" +
            codigo +
            "</strong>" +
            "</p>" +
            "<p>La solicitud fue remitada a alta gerencia para su evaluacion  <strong>" +
            "<p>Fecha:<strong>" +
            fechaInicio +
            "</strong></p>" +
            "<p>Fecha:<strong>" +
            fechaFin +
            "</strong></p>"
            : "";
    return emailDetalle;
  };

  const emailAGCosultorDetalle = (
    codigo,
    nombre,
    ci,
    producto,
    fechaInicio,
    fechaFin,
    detalle,
    estado,
    tipo
  ) => {
    const emailDetalle =
      estado === "ACEPTADO"
        ? "<p>Según solicitud con el código: <strong>" +
        codigo +
        "</strong>" +
        "</p>" +
        "<p>De acuerdo a solicitud <strong>" +
        tipo +
        " </strong> y realizada la Debida Diligencia se Autoriza continuar con la 	operación del señor (a)  <strong>" +
        nombre.toUpperCase() +
        " </strong> con número de CI <strong>" +
        ci +
        "<p>Fecha:<strong>" +
        fechaInicio +
        "</strong></p>" +
        "<p>Fecha:<strong>" +
        fechaFin +
        "</strong></p>"
        : estado === "RECHAZADO"
          ? "<p>Según solicitud con el código: <strong>" +
          codigo +
          "</strong>" +
          "</p>" +
          "<p>De acuerdo a solicitud <strong>" +
          tipo +
          " </strong> y según información de Debida Diligencia NO se Autoriza 	continuar con la operación del señor (a)  <strong>" +
          nombre.toUpperCase() +
          " </strong> con número de CI <strong>" +
          ci +
          "<p>Fecha:<strong>" +
          fechaInicio +
          "</strong></p>" +
          "<p>Fecha:<strong>" +
          fechaFin +
          "</strong></p>"
          : "";
    return emailDetalle;
  };
  const actualizarPasswordSupa = () => {
    setShowMessageSucces(true);
  }
  const emailUIFAltaGerenciaDetalle = (
    codigo,
    nombre,
    ci,
    producto,
    fechaInicio,
    fechaFin,
    detalle
  ) => {
    const emailDetalle =
      "<p>Según solicitud con el código: <strong>" +
      codigo +
      "</strong>" +
      "</p>" +
      "<p>Se solicita por favor su Autorización para continuar con la operación del señor (a)  <strong>" +
      nombre.toUpperCase() +
      " </strong> con número de CI <strong>" +
      ci +
      "<p>Fecha:<strong>" +
      fechaInicio +
      "</strong></p>" +
      "<p>Fecha:<strong>" +
      fechaFin +
      "</strong></p>";
    return emailDetalle;
  };

  return (
    <SolicitudContext.Provider
      value={{
        emailCosultorUnidadCumplimiento,
        emailCosultorUnidadCumplimientoDetalle,
        emailUIFAltaGerenciaDetalle,
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
        correos,
        enviarCorreo,
        actualizarPasswordSupa,
        showMessageSucces
      }}
    >
      {children}
    </SolicitudContext.Provider>
  );
};

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
    const user = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase.rpc("obtener_usuarios", {
      usuario: user,
    });
    if (error) throw error;
    
    setFuncionario(data);
    console.log(funcionario);
  };

  const getUsuarioIFD = async () => {
    const user = (await supabase.auth.getUser()).data.user.id;
    //const { data, error } = await supabase.rpc("obtener_usuarios");
    const storedData = {};
    const localStorageLength = localStorage.length;
    for (let i = 0; i < localStorageLength; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      storedData[key] = JSON.parse(value);
    }
    console.log(storedData);
    console.log(localStorage.getItem("sb-vspemsodlumlsrzolwuj-auth-token"));

    // Verificar si se encontraron datos en el localStorage
    if (Object.keys(storedData).length > 0) {
      // Iterar sobre los datos almacenados
      Object.keys(storedData).forEach((key) => {
        const data = storedData[key];

        // Agregar un atributo adicional a los datos
        if (data) {
          const nuevoAtributo = "valor"; // Reemplaza 'nuevoAtributo' y 'valor' con tus propios valores
          data.nuevoAtributo = nuevoAtributo;
          storedData[key].nuevoAtributo = nuevoAtributo;
        }
      });

      // Actualizar los datos en el localStorage
      Object.keys(storedData).forEach((key) => {
        const value = JSON.stringify(storedData[key]);
        localStorage.setItem(key, value);
      });
    } else {
      // Manejo para cuando no hay datos almacenados en el localStorage
    }
    getFuncionario();
  };

  const getSolicitudes = async () => {
    const user = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase.rpc("solicitudes_uif", {
      usuario: user,
    });
    if (error) throw error;
    console.log(data, error);
    setSolicitudes(data);
    console.log(data);
  };

  const getCaedec = async () => {
    const { error, data } = await supabase.from("conf_caedec").select();
    setCaedec(data);
  };

  const createSolicitudes = async (solicitud) => {
    setAdding(true);
    const codigo = funcionario[0].cod_usuario+"-"+solicitud.tipo+"-"+(solicitudes.length+1);
    var today = new Date();
    try {
      const user = (await supabase.auth.getUser()).data.user.id;
      solicitud.id_usuario = user;
      //solicitud.fecha_registro = today;
      solicitud.codigo_solicitud = codigo;
      solicitud.correo_usuario_uif = "uif@fubode.org";

      const { error } = await supabase
        .from("uif_solicitudes")
        .insert(solicitud);
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
        funcionario,
        loading,
        caedec,
        caedecSeleccionado,
        getSolicitudes,
        createSolicitudes,
        getCaedec,
        setCaedecSeleccionado,
        getUsuarioIFD,
        getFuncionario,
      }}
    >
      {children}
    </SolicitudContext.Provider>
  );
};

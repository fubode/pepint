import React, { PureComponent, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSolicitud } from '../context/SolicitudContext';

const Password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const { actualizarPasswordSupa,showMessageSucces } = useSolicitud();
  const [error, setError] = useState('');

  const actualizarPassword = () => {
    setError('');
    console.log(oldPassword, newPassword);
    if (oldPassword === newPassword) {
      setError('La nueva contraseña no puede ser igual a la anterior.');
      return;
    }

    // Verificar que newPassword tenga al menos 6 caracteres
    if (newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Verificar que newPassword contenga al menos una letra mayúscula
    if (!/[A-Z]/.test(newPassword)) {
      setError('La nueva contraseña debe contener al menos una letra mayúscula.');
      return;
    }

    // Verificar que newPassword contenga al menos una letra minúscula
    if (!/[a-z]/.test(newPassword)) {
      setError('La nueva contraseña debe contener al menos una letra minúscula.');
      return;
    }

    // Verificar que newPassword contenga al menos un número
    if (!/\d/.test(newPassword)) {
      setError('La nueva contraseña debe contener al menos un número.');
      return;
    }

    // Verificar que newPassword contenga al menos un carácter especial
    if (!/[@#$%^&+=!]/.test(newPassword)) {
      setError('La nueva contraseña debe contener al menos un carácter especial (por ejemplo, @, #, $, %, ^, &, +, =, !).');
      return;
    }
    
    // Si todas las verificaciones pasan, la contraseña es válida
    console.log('Contraseña actualizada correctamente.');
    actualizarPasswordSupa(oldPassword,newPassword);
  }

  return (
    <>
      <div className="card-body mt-4 text-center">
        <div className="form-outline mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="typeEmailX-2"
            className="form-control form-control-lg"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
          />
          <label className="form-label" htmlFor="typeEmailX-2">
            Contraseña
          </label>
          <span className="password-toggle-icon m-4" onClick={toggleShowPassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="form-outline mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            id="typePasswordX-2"
            name="password"
            className="form-control form-control-lg"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
          <label className="form-label" htmlFor="typePasswordX-2">
            Repita la Contraseña
          </label>
          <span className="password-toggle-icon m-4" onClick={toggleShowPassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
        </div>
      </div>
      <Button className="" onClick={actualizarPassword}>
        Actualizar contraseña
      </Button>
      <Modal show={showMessageSucces} onHide={()=>{}}>
        <Modal.Header
          className="bg-success"
          closeButton
        >
          <Modal.Title>{"FELICIDADES"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{"La contraseña fue cambiada con exito"}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>{}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Password

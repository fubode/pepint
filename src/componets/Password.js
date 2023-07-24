import React, { PureComponent } from 'react';
//import bcrypt from 'bcrypt';

export class Password extends PureComponent {
  state = {
    oldPassword: '',
    newPassword: '',
  };

  handleOldPasswordChange = (event) => {
    this.setState({ oldPassword: event.target.value });
  };

  handleNewPasswordChange = (event) => {
    this.setState({ newPassword: event.target.value });
  };

  actualizarPassword = async () => {
    const { oldPassword, newPassword } = this.state;

    // Encriptar el nuevo password
    const saltRounds = 10;
    //const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    if (oldPassword === newPassword) {
      console.log('Los passwords sson iguales, se ejecutará la actualización.');
      //console.log('Password encriptado:', hashedPassword);
      // Lógica para actualizar el password en tu aplicación usando el hashedPassword
    } else {
      console.log('Los passwords no son iguales, no se realizará la actualización.');
    }
  };

  render() {
    return (
      <>
        <p>Password antiguo</p>
        <input type='text' value={this.state.oldPassword} onChange={this.handleOldPasswordChange} />
        <p>Password nuevo</p>
        <input type='text' value={this.state.newPassword} onChange={this.handleNewPasswordChange} />
        <button onClick={this.actualizarPassword}>Actualizar Password</button>
      </>
    );
  }
}

export default Password;

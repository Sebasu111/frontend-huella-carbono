import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/App.css'; // Asegúrate que el CSS esté en esta ruta

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  const handleLogin = () => {
    if (usuario === 'admin' && clave === '1234') {
      localStorage.setItem('adminLogueado', true);
      toast.success("Inicio de sesión exitoso 🎉");
      setTimeout(() => navigate('/admin'), 1000);
    } else {
      toast.error("Credenciales incorrectas ❌");
    }
  };

  return (
    <div className="login-container fade-in">
      <div className="login-card">
        <h2>👤 Panel Administrativo</h2>

        <div className="form-group">
          <label htmlFor="usuario">Usuario:</label>
          <input
            id="usuario"
            type="text"
            placeholder="Ingrese su usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="clave">Contraseña:</label>
          <input
            id="clave"
            type="password"
            placeholder="Ingrese su contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
        </div>

        <button onClick={handleLogin}>Ingresar</button>
      </div>
    </div>
  );
};

export default Login;

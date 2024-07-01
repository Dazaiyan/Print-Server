import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import './Login.css';

const Login = () => {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(cedula, password);
      localStorage.setItem('token', res.data.token);
      navigate('/print');
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <img src="logo.png" alt="Logo del Hospital" /> {/* Asegúrate de tener un logo adecuado */}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <img src="usuario.png" alt="Cédula Icon" /> {/* Asegúrate de tener un icono adecuado */}
            <input
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Cédula"
              required
            />
          </div>
          <div className="input-group">
            <img src="contraseña.png" alt="Password Icon" /> {/* Asegúrate de tener un icono adecuado */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
        <div className="links">
          <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;

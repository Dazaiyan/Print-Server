import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import './Login.css';
import ForgotPasswordModal from './ForgotPasswordModal';

const Login = () => {
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');
  const [showClave, setShowClave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await login(cedula, clave);
      if (res.data.authenticated) {
        navigate('/print');
      } else {
        setError('Hubo un error al iniciar sesión. Por favor, verifica tus credenciales.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      setError('Hubo un error al iniciar sesión. Por favor, verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <img src="/logo.png" alt="Logo del Hospital" />
        </div>
        {error && <div className="error-alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <img src="/usuario.png" alt="Cédula Icon" />
            <input
              type="cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Cédula"
              required
            />
          </div>
          <div className="input-group">
            <img src="/contraseña.png" alt="Password Icon" />
            <input
              id="clave"
              type={showClave ? "contraseña" : "password"}
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="show-clave-group">
            <input
              type="checkbox"
              id="show-clave-checkbox"
              checked={showClave}
              onChange={(e) => setShowClave(e.target.checked)}
            />
            <label htmlFor="show-clave-checkbox">Mostrar contraseña</label>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
        <div className="links">
          <a href="#!" onClick={() => setIsModalOpen(true)}>¿Olvidaste tu contraseña?</a>
        </div>
      </div>
      {isModalOpen && <ForgotPasswordModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Login;

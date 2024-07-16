import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import './Login.css';

const Login = () => {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('user'); // Valor predefinido es "user"
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await login(cedula, password, role); // Incluye el rol en la petición
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', role); // Guarda el rol en el almacenamiento local
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/print');
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
          <img src="/logo.png" alt="Logo del Hospital" /> {/* Asegúrate de tener un logo adecuado */}
        </div>
        {error && <div className="error-alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <img src="/usuario.png" alt="Cédula Icon" /> {/* Asegúrate de tener un icono adecuado */}
            <input
              type="Cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Cédula"
              required
            />
          </div>
          <div className="input-group">
            <img src="/contraseña.png" alt="Password Icon" /> {/* Asegúrate de tener un icono adecuado */}
            <input
              id="password"
              type={showPassword ? "contraseña" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="show-password-group">
            <input
              type="checkbox"
              id="show-password-checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <label htmlFor="show-password-checkbox">Mostrar contraseña</label>
          </div>
          <div className="role-group">
            <label htmlFor="role" className="role-label">Rol:</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="role-select">
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
        <div className="links">
          <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;

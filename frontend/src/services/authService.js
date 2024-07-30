import axios from 'axios';

export const login = async (cedula, clave) => {
  return await axios.post('http://localhost:5000/api/auth/login', {
    cedula,
    clave
  }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const isAuthenticated = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/auth/checkAuth', { withCredentials: true });
    return response.data.authenticated;
  } catch (error) {
    return false;
  }
};
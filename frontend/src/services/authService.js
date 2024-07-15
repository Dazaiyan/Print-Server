import axios from 'axios';

export const login = async (cedula, password) => {
  return await axios.post('http://localhost:5000/api/auth/login', { cedula, password }, {
    withCredentials: true
  });
};

export const checkAuth = async () => {
  return await axios.get('http://localhost:5000/api/auth/checkAuth', {
    withCredentials: true
  });
};

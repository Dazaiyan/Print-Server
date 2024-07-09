import axios from 'axios';

export const login = async (cedula, password, role) => {
  return await axios.post('http://localhost:5000/api/auth/login', { cedula, password, role });
};

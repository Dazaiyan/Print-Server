import axios from 'axios';

export const login = async (cedula, clave) => {
  return await axios.post('http://localhost:5000/proxy/getLoginAvalab', {
    cedula,
    clave
  }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

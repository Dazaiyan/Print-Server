import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const login = (cedula, password) => {
    return axios.post(API_URL + 'login', { cedula, password });
};

export { login };

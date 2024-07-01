import axios from 'axios';

const API_URL = 'https://23k9vt4z-5000.use.devtunnels.ms/';

const addPrintRequest = (file, fileName, printer) => {
    const token = localStorage.getItem('token');
    return axios.post(API_URL, { file, fileName, printer }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export { addPrintRequest };

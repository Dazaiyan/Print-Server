import axios from 'axios';

const API_URL = 'http://172.20.33.219:5010//api/print/print';

const addPrintRequest = (file, fileName, printer) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('printer', printer);

    return axios.post(API_URL, formData, {
        withCredentials: true,  // Esto asegura que las cookies se envíen con la solicitud
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export { addPrintRequest };

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PrintForm = () => {
    const [file, setFile] = useState(null);
    const [module, setModule] = useState('');
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!file || !module || !pages) {
            alert('Por favor, completa todos los campos');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('module', module);
        formData.append('pages', pages);

        setLoading(true);

        try {
            await axios.post('http://localhost:5000/api/print/print', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Documento enviado a imprimir correctamente');
            navigate('/'); // Redirige a la página deseada después de la impresión
        } catch (error) {
            console.error('Error al enviar a imprimir', error);
            alert('Error al enviar a imprimir');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Enviar a Imprimir</h1>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
            <input type="text" placeholder="Módulo" value={module} onChange={(e) => setModule(e.target.value)} required />
            <input type="number" placeholder="Número de páginas" value={pages} onChange={(e) => setPages(e.target.value)} required />
            <button type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Imprimir'}
            </button>
        </form>
    );
};

export default PrintForm;

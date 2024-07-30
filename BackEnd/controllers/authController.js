const axios = require('axios');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const EXTERNAL_API_URL = `${process.env.REACT_APP_BACKEND_URL}/getLoginAvalab`;

exports.login = async (req, res) => {
  const { cedula, clave } = req.body;
  try {
    const hashedClave = md5(clave); // Asegurarse de que la clave se hashea correctamente
    const response = await axios.post(EXTERNAL_API_URL, { cedula, clave: hashedClave });

    if (response.data && response.data.status === 1) {
      const token = jwt.sign({ cedula }, JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true }); // Almacenar el token en una cookie
      res.json({ authenticated: true, user: response.data });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};0
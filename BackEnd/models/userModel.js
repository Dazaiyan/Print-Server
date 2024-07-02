// userModel.js
const pool = require('../db');

const findUserByCedula = async (cedula) => {
    try {
        const res = await pool.query('SELECT * FROM users WHERE cedula = $1', [cedula]);
        return res.rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    findUserByCedula,
};

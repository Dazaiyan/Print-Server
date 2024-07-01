const pool = require('../db');

const findUserByCedula = async (cedula) => {
    const res = await pool.query(
        'SELECT * FROM users WHERE cedula = $1',
        [cedula]
    );
    return res.rows[0];
};

module.exports = { findUserByCedula };

const pool = require('../db');

const createPrintRequest = async (file, fileName, printer) => {
    const res = await pool.query(
        'INSERT INTO prints (file, file_name, printer, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [file, fileName, printer]
    );
    return res.rows[0];
};

module.exports = { createPrintRequest };
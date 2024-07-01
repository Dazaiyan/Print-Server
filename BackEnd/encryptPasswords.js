const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

const encryptPasswords = async () => {
    const res = await pool.query('SELECT id, password FROM users');
    for (const user of res.rows) {
        // Verificar si la contraseña ya está encriptada
        if (!user.password.startsWith('$2b$')) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, user.id]);
        }
    }
    console.log('Passwords encrypted successfully');
    pool.end();
};

encryptPasswords().catch(err => {
    console.error('Error encrypting passwords:', err);
    pool.end();
});

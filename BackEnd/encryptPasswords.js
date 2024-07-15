const bcrypt = require('bcryptjs');
const pool = require('./db');

const encryptPasswords = async () => {
    try {
        const usersResult = await pool.query('SELECT * FROM users');
        const users = usersResult.rows;

        for (let user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, user.id]);
        }

        console.log('Passwords encrypted successfully');
    } catch (error) {
        console.error('Error encrypting passwords:', error);
    }
};

encryptPasswords();
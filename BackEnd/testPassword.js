const bcrypt = require('bcryptjs');

const testPassword = async () => {
    const plainPassword = '123456';
    const hashedPassword = '$2a$10$P9k6mg/WvqshDi5BMPBBgONWs38gB1M0cmOBc4c7p9oAnm1VWnCSS';

    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('Password match:', isMatch);
};

testPassword();

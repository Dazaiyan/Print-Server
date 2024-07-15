const bcrypt = require('bcryptjs');

const hashPassword = async () => {
    const plainPassword = '123456';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    console.log('Generated hash:', hashedPassword);
};

hashPassword();
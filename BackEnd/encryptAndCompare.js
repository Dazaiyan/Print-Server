const bcrypt = require('bcryptjs');

const encryptPassword = async () => {
    const plainPassword = '123456';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    console.log('Hashed Password:', hashedPassword);

    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('Password match:', isMatch);
};

encryptPassword();
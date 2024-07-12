const bcrypt = require('bcryptjs');

const generateHashes = async () => {
  const password = 'prueba';
  const saltRounds = 10;

  const hashes = [];
  for (let i = 0; i < 10; i++) {
    const hash = await bcrypt.hash(password, saltRounds);
    hashes.push(hash);
  }

  console.log(hashes);
};

generateHashes();

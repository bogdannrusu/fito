/* eslint-disable prettier/prettier */
const crypto = require('crypto');

// Hashing a plain password using SHA-256
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const plainPassword = 'brs1911';
const hashedPassword = '4d866f7f57ed84a65baa91e6de19f2f6cd6b999f1047f8ff85995b6d7ec616b4';

const hashedPlainPassword = hashPassword(plainPassword);

if (hashedPlainPassword === hashedPassword) {
  console.log('Se potrivesc');
} else {
  console.log('Nu se potrivesc');
}

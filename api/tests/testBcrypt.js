/* eslint-disable prettier/prettier */
const Crypto = require('crypto')

const plainPassword = 'brs1911';
const hashedPassword = '4d866f7f57ed84a65baa91e6de19f2f6cd6b999f1047f8ff85995b6d7ec616b4';

Crypto.compare(plainPassword, hashedPassword, (err, isMatch) => {
  if (err) {
    console.error('Error comparing passwords:', err);
  } else if (isMatch) {
    console.log('Se potrivesc');
  } else {
    console.log('Nu se potrivesc');
  }
});

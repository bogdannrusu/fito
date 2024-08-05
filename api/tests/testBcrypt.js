/* eslint-disable prettier/prettier */
const bcrypt = require('bcrypt');

const plainPassword = 'brs1911';
const hashedPassword = '$2b$10$Irgqcandao44Tklb8r7iH.lkJweVUIbAo8vCb../37Kl1SyqwsRV6';

bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
  if (err) {
    console.error('Error comparing passwords:', err);
  } else if (isMatch) {
    console.log('Se potrivesc');
  } else {
    console.log('Nu se potrivesc');
  }
});

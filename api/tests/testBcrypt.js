/* eslint-disable prettier/prettier */
const bcrypt = require('bcrypt');

const plainPassword = 'brs1911';
const hashedPassword = '$2a$12$s3/UppfzNQx90ZBxBcFo2e4mwIO.cqMMXPyJ3IcDTpvLgdrYwIUai';

bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
  if (err) {
    console.error('Error comparing passwords:', err);
  } else if (isMatch) {
    console.log('Se potrivesc');
  } else {
    console.log('Nu se potrivesc');
  }
});

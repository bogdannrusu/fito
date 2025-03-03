const jwt = require('jsonwebtoken');

const users = [
  { _id: "66b1efd736778681fd820bd7", username: "bogdan.rusu", role_id: 1 },
  { _id: "66b1efd736778681fd820bd8", username: "razvan.rusu", role_id: 1 },
  { _id: "66b1efd736778681fd820bd9", username: "jane.smith", role_id: 2 },
  { _id: "66b1efd736778681fd820bd0", username: "alex.brown", role_id: 2 },
  { _id: "66b1efd736778681fd820bd1", username: "maria.white", role_id: 2 }
];

const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmIxZWZkNzM2Nzc4NjgxZmQ4MjBiZDciLCJpYXQiOjE3MjMxMDU5MzIsImV4cCI6MTcyMzEwOTUzMn0.8DDQhe3ajms2JkgkLWInPtXOTu98ItDSpK4Hk-CUlXA';

users.forEach(user => {
  const token = jwt.sign(
    { 
      userId: user._id,
      username: user.username,
      role_id: user.role_id 
    },
    JWT_SECRET,
    { expiresIn: '30d' }
  );

  console.log(`\nUser: ${user.username}`);
  console.log(`Token: ${token}`);
  console.log('------------------------');
});

/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const User = require('./models/users'); // Adjust the path to your User model

async function addRolesToExistingUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/your_database', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Update all users who don't have a roles field
    await User.updateMany(
      { roles: { $exists: false } },
      { $set: { roles: ['user'] } }
    );

    console.log('Roles added to existing users.');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error updating users:', error);
  }
}

addRolesToExistingUsers();

/* eslint-disable prettier/prettier */
const User = require('../models/users');
const Role = require('../models/roles');
const Counter = require('../models/counterModel');
const Crypto = require('crypto');
const jwt = require('jsonwebtoken');

const findAllUsers = async () => {
  return User.find();
};

const findUserById = async (id) => {
  return User.findById(id);
};

const findUserByUsername = async (username) => {
  return User.findOne({ username });
};

const createUser = async (userData) => {
  // Increment the user_id counter
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'user_id' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const newUser = new User({
    user_id: counter.seq,
    username: userData.username,
    password: userData.password,
    email: userData.email,
    is_active: true,
    createdAt: new Date(),
  });

  return newUser.save();
};

const updateUser = async (id, updateData) => {
  try {
    if (updateData.password) {
      updateData.password = Crypto.createHash('sha256').update(updateData.password).digest('hex');
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      console.log(`No user found with ID: ${id}`);
      return null;
    }

    console.log(`User with ID: ${id} updated successfully.`);
    return updatedUser;
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error;
  }
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

const comparePassword = async (plainPassword, hashedPassword) => {
  const hash = Crypto.createHash('sha256').update(plainPassword).digest('hex');
  return hash === hashedPassword;
};

const generateToken = (user) => {
  const token = jwt.sign(
    { 
      userId: user._id.toString(),
      timestamp: Date.now()
    },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  );
  
  // Save the new token to user document
  user.token = token;
  user.save();
  
  return token;
};

const assignRolesToAllUsers = async () => {
  try {
    const users = await User.find();

    for (const user of users) {
      const existingRole = await Role.findOne({ user_id: user.user_id });

      if (!existingRole) {
        const newRole = new Role({
          user_id: user.user_id,
          role_name: 'user'
        });

        await newRole.save();
        console.log(`Assigned role 'user' to user with ID: ${user.user_id}`);
      } else {
        console.log(`User with ID: ${user.user_id} already has a role assigned.`);
      }
    }
    console.log('Role assignment completed for all users.');
  } catch (error) {
    console.error('Error assigning roles to users:', error);
  }
};

const userByTokenHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role_id: user.role_id,
        roles: user.roles || []
      }
    });
  } catch (error) {
    console.error('Error fetching user by token:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  findAllUsers,
  findUserById,
  findUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  comparePassword,
  generateToken,
  userByTokenHandler,
  assignRolesToAllUsers
};

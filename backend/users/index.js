const express = require('express');
const router = express.Router();
const {
  createUserSchema
} = require('./validation');
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  removeUser,
  removeAllUsers
} = require('./usersController');

router.post('/user', createUserSchema, createUser);
router.get('/user/users', getAllUsers);
router.delete('/user/users', removeAllUsers);
router.get('/user/:userName', getUser);
router.put('/user/:userName', updateUser);
router.delete('/user/:userName', removeUser);

module.exports = router;
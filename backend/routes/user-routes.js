const express = require("express");

const { register, login, validUser, searchUsers, getUserById, updateInfo } = require("../controllers/user-controller");
const Auth = require("../middleware/user");
 
const userRouter = express.Router();

userRouter.post('/auth/register', register);
userRouter.post('/auth/login', login);
userRouter.get('/auth/valid', Auth, validUser);
userRouter.get('/api/users?', Auth, searchUsers);
userRouter.get('/api/users/:id', Auth, getUserById);
userRouter.patch('/api/users/update/:id', Auth, updateInfo);

module.exports = userRouter;
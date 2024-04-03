const express = require("express");
const Auth = require("../middleware/user")
const { accessChats, fetchAllChats, createGroup, renameGroup, addToGroup,removeFromGroup } = require("../controllers/chat-controller")

const chatRouter = express.Router();

chatRouter.post('/', Auth, accessChats);
chatRouter.get('/', Auth, fetchAllChats);
chatRouter.post('/group', Auth, createGroup);
chatRouter.patch('/group/rename', Auth, renameGroup);
chatRouter.patch('/groupAdd', Auth, addToGroup);
chatRouter.patch('/groupRemove', Auth, removeFromGroup);
chatRouter.delete('/removeUser', Auth);

module.exports = chatRouter;
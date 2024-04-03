const express = require("express");
const { sendMessage, getMessages } = require("../controllers/message-controller");
const Auth = require("../middleware/user");

const messageRouter = express.Router();

messageRouter.post('/', Auth, sendMessage);
messageRouter.get('/:chatId', Auth, getMessages);

module.exports = messageRouter;
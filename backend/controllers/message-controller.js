const Message = require("../models/message-model");
const User = require("../models/user-model");
const Chat = require("../models/chat-model");

const sendMessage = async (req, res) => {
    const { chatId, message } = req.body;
    try{
        let msg = await Message.create({ sender : req.rootUserId, message, chatId });
        msg = await(
            await msg.populate('sender', 'name profilePic email')
        ).populate({
            path : 'chatId',
            select : 'chatName isGroup users',
            model : 'Chat',
            populate : {
                path : 'users',
                select : 'name email profilePic',
                model : 'User'
            }
        });
        await Chat.findByIdAndUpdate(chatId, {
            latestMessage : msg
        });
        res.status(200).send(msg);
    }
    catch(error){
        res.status(500).json({ error : error });
        console.log(error);
    }
};

const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try{
        let messages = await Message.find({ chatId })
        .populate({
            path : 'sender',
            model : 'User',
            select : 'name profilePic email'
        })
        .populate({
            path : 'chatId',
            model : 'Chat'
        });
        res.status(200).json(messages);
    }
    catch(error){
        res.sendStatus(500).json({ error : error });
        console.log(error);
    }
};

module.exports = { sendMessage, getMessages };
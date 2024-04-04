const express = require('express');

require('dotenv').config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");
const cors = require("cors");

const mongoDBConnect = require('./database/connection');
const userRouter = require("./routes/user-routes")
const chatRouter = require("./routes/chat-routes");
const messageRouter = require("./routes/message-routes");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use('/', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

mongoose.set('strictQuery', false);
mongoDBConnect();

const server = app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});

const io = socketIO(server, {
  pingTimeout : 60000,
  cors : {
    origin : '*'
  }
});

io.on("connection", (socket) =>{
  socket.on("setup", (user) => {
    socket.join(user.id);
    socket.emit("connected");
  });
  socket.on("join room", (room) => {
    socket.join(room);
  });
  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });
  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chatId;
    if(!chat){
      console.log("users not defined");
    }
    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
});

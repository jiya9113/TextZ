const express = require("express");
const dotenv = require("dotenv");
const { chat } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const path = require("path");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

/*----------configuration------------*/
const app = express();
dotenv.config();
connectDB();
/*----------from front end data come in json format so thats why------------*/
app.use(express.json());
/*----------TRYING TO DEPLOY--------------------------*/
/*----------TRYING TO DEPLOY--------------------------*/
/*----------TRYING TO DEPLOY--------------------------*/
//  const__dirname = path.resolve();
//  if (process.env.NODE_ENV === "production") {
//    app.use(express.static(path.join(__dirname, "../frontend/build")));
//    app.get("*", (req, res) =>{
//        res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
//  });
//  } else {
//    app.get("/", (req, res) => {
//      res.send("api is running");
//    });
//  }
 /*---------ENDING TO DEPLOY--------------------------*/
/*----------ENDING TO DEPLOY--------------------------*/
/*----------ENDING TO DEPLOY--------------------------*/


/*----------TRYING SERVER FOR STARTING PHASE------------*/
app.get('/',(req,res)=>{
  res.send("api is running");
});
app.get("/api/chats",(req, res) => {
  res.send(chat);
});
app.get("/api/chats/:id", (req, res) => {
  //ex-localhost:500/api/chats/617a077e18c2d468bc7c4dd4
  //console.log(req);           /*a lot of data but we dont need it , here we see params that as our id */
  //console.log(req.params.id); //now we got only id
  const singleChat=chat.find(c=>c._id===req.params.id);
  res.send(singleChat);
});

/*----------TRYING SERVER WITH PROPER POINTS------------*/
app.get("/", (req, res) => {
  res.send("api is running");
});
/*----------server for searchig and user------------*/
app.use("/api/user", userRoutes);
/*----------server for chat------------*/
app.use("/api/chat", chatRoutes);
/*----------server for one to one messaging------------*/
//  app.use("/api/message",(req, res) => {
//    res.send("api is running for message routes");
//  });
app.use("/api/message", messageRoutes);
/*----------TRYING SERVER WITH ERRORS------------*/
app.use(notFound);
app.use(errorHandler);
/*----------PORT WORK------------*/
const PORT = process.env.PORT || 5000;
//app.listen(PORT, console.log(`server started on port ${PORT}`.green.underline));
/*----------PORT WITH SOCKET.IO------------*/
const server = app.listen(
  PORT,
  console.log(`server started on port ${PORT}`.green.underline)
);
const io = require("socket.io")(server, {
  pingTimeout: 6000,
  cors: { origin: "http://localhost:3000" },
});
io.on("connection", (socket) => {
  console.log("CONNECTED TO SOCKET.IO");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connection");
  });
  // MAKIN ON
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");
    //     chat.users.forEach(user=>{
    //       if(user._id==newMessageRecieved.sender._id)return ;
    //        socket.in(user._id).emit
    //     })

    //   })
    // });
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

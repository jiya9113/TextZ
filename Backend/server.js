const express = require ("express");
const {chat}   = require ("./data/data");
const app=express();
app.get('/',(req,res)=>{
    res.send("api express to get is running");
});
app.get("/api/chat", (req, res) => {
  res.send(chat);
});
app.get("/api/chat/:id", (req, res) => {
  //console.log(req.params.id);
  const singlechat = chat.find((c) => c._id === req.params.id);
  res.send(singlechat);
});
app.listen(5000,console.log("server started on 5000"));
// .env not working , it is used to give custom port 
// const dotenv = require("dotenv");
// dotenv.config();
// const PORT = process.env.PORT || 3000;
// app.listen(5000, console.log("server started on ${PORT}"));
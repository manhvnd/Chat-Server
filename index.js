const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.route("/").get((req, res) => {
  res.json("Hey there, welcome!")
})

io.on("connection", (socket) => {
  socket.join("TMA IOT");
  console.log("backend connected");
  socket.on("sendMsg", (msg) => {
    console.log(msg);
    io.to("TMA IOT").emit("sendMsgServer", { ...msg, type: "otherMsg" });
  })
});

httpServer.listen(3000);
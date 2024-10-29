require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { Message } = require("./model/message");
const { dbConnection } = require("./lib/dbConnection");

const port = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/message", async (req, res) => {
  await dbConnection();
  try {
    const allMessage = await Message.find();
    res.status(200).json(allMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

io.on("connection", async (socket) => {
  console.log(`A user is connected having id ${socket.id}`);
  socket.on("chat", async (newMessage) => {
    await dbConnection();
    await Message.create(newMessage);
    io.emit("newMessage", newMessage);
  });
  socket.on("disconnect", (reason) => {
    console.log(`user is disconnected due to ${reason}`);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

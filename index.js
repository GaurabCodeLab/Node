require("dotenv").config();
const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
const { dbConnection } = require("./lib/dbConnection");
const { Message } = require("./model/message");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

app.get("/message", async (req, res) => {
  await dbConnection();
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

io.on("connect", (socket) => {
  console.log("New user connected");
  socket.on("chat", async ({ userName, message }) => {
    await Message.create({ userName, message });
    io.emit("chat", { userName, message });
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

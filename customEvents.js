const express = require("express");
const EventEmitter = require("events");

const app = express();

const eventObj = new EventEmitter();

app.get("/", (req, res) => {
  res.send("hello world");
});

eventObj.on("raja", (a) => {
  console.log("hello");
  console.log(a);
});

eventObj.emit("raja", "ram", "kaam", "jaam");
console.log("event hai", eventObj.emit("raja", "khaja"));

app.listen(1634, () => {
  console.log("server is running");
});

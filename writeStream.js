const fs = require("fs");

const ws = fs.createWriteStream("write.txt");

// sequence of events which occurs are:- open=>finish=>close

ws.write("hello raja");
ws.write("kya kar rahe ho");
ws.end();
ws.on("open", () => {
  console.log("open hua");
});

ws.on("error", () => {
  console.log("error hua");
});

ws.on("close", () => {
  console.log("close hua");
});

ws.on("finish", () => {
  console.log("finish hua");
});

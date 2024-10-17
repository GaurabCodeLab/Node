const fs = require("fs");

const readable = fs.createReadStream("read.txt");

// sequence of events which occurs are:- open=>data=>end=>close
readable.on("data", (chunk) => {
  console.log("data read hua", chunk);
});

readable.on("open", () => {
  console.log("open hua");
});

readable.on("close", () => {
  console.log("close hua");
});

readable.on("end", () => {
  console.log("end hua");
});

readable.on("error", () => {
  console.log("error hua");
});

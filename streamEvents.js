const fs = require("fs");

let count = 0;

const readable = fs.createReadStream("data.txt");
readable.on("data", (chunk) => {
  count = count + 1;
  console.log(`data read hua, ${count}`, chunk);
});

readable.on("open", (x) => {
  console.log("open hua", x);
});

readable.on("close", (x) => {
  console.log("close hua", x);
});

readable.on("end", (x) => {
  console.log("end hua", x);
});

readable.on("error", (x) => {
  console.log("error hua", x);
});

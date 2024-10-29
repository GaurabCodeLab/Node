const fs = require("fs");

const rs = fs.createReadStream("read.txt");

// sequence of events which occurs are:- open=>data=>end=>close
rs.on("data", (chunk) => {
  console.log("data hua", chunk);
});

rs.on("open", () => {
  console.log("open hua");
});

rs.on("close", () => {
  console.log("close hua");
});

rs.on("end", () => {
  console.log("end hua");
});

rs.on("error", () => {
  console.log("error hua");
});

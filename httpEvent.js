const http = require("http");

const server = http.createServer((req, res) => {
  res.write("hello gaurab");
  res.end();
});

server.on("request", (x) => {
  console.log("request receive hua");
});

server.on("close", () => {
  console.log("close hua");
});

server.on("connect", () => {
  console.log("connect hua");
});

server.listen(1634, () => {
  console.log("server is running");
});

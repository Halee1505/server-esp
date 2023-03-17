const serverless = require("serverless-http");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World!\n");
});

const PORT = process.env.PORT || 1505;

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

const io = socketIo(server, {
  allowRequest: (req, callback) => callback(null, true),
  cors: {
    origin: "*",
    credentials: false,
  },
});

io.on("connection", (socket) => {
  const transport = socket.conn.transport.name; // in most cases, "polling"
  console.log("a user connected with transport: " + transport);

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    socket.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports.handler = serverless(app);

const serverless = require("serverless-http");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false,
  })
);

const server = http.createServer(app);

const PORT = process.env.PORT || 2222;

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

const io = socketIo(server, {
  transports: ["websocket", "polling"],
  allowRequest: (req, callback) => callback(null, true),
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false,
  },
});

io.on("connection", (socket) => {
  const transport = socket.conn.transport.name; // in most cases, "polling"
  const sessionID = socket.handshake.query.sessionID;
  console.log("a user connected with transport: " + transport);
  console.log("sessionID: " + sessionID);

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    socket.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Hello Wor121sld!");
});
app.get("/alo", (req, res) => {
  res.send("emwo đâsdmewo!");
});
app.post("/socket.io/", (req, res) => {
  res.send("connected socket!");
});

module.exports.handler = serverless(app);

const app = require("express")();
const { Server } = require("socket.io");
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
const server = require("http").createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    socket.emit("chat message1", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(1505, () => {
  console.log("listening on *:1505");
});

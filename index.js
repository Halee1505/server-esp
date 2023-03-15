const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  app.get("/connect", (req, res) => {
    io.emit("chat message", "Hello World!");
    res.send("Connected");
  });
});

app.get("/", (req, res) => {
  socket.emit("chat message", "Hello World!");
  res.send("Hello World!");
});

http.listen(1505, () => {
  console.log("listening on *:1505");
});

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    socket.emit("chat message", "liuliuliu");
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  socket.emit("chat message", "Hello World!");
  res.send("Hello World!");
});

http.listen(1505, () => {
  console.log("listening on *:1505");
});

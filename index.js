const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  socket.on("chat message", (msg) => {
    res.send(msg);
  });
  res.send("Hello World!");
});

http.listen(1505, () => {
  console.log("listening on *:1505");
});

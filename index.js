const serverless = require("serverless-http");
const express = require("express");
const http = require("http");
const cors = require("cors");
const pubnub = require("./config/pubnub");
require("dotenv").config();
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

const server = http.createServer(app);

const PORT = process.env.PORT || 2222;

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send({
    message: "connected",
    code: 200,
  });
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/control/:action", (req, res) => {
  const { action } = req.params;
  const channel = "client";
  const message = action;
  pubnub.publish({ channel, message }, (status, response) => {
    if (status.error) {
      console.error(status);
    }
  });
  res.sendFile(__dirname + "/index.html");
});

module.exports = serverless(app);
